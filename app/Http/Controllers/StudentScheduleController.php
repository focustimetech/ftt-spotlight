<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Staff;
use App\Student;
use App\Amendment;
use App\Block;
use App\BlockSchedule;
use App\Course;
use App\Topic;
use App\TopicSchedule;
use App\SchedulePlan;
use App\LedgerEntry;
use App\Http\Resources\Staff as StaffResource;
use App\Http\Resources\Amendment as AmendmentResource;
use App\Http\Resources\Appointment as AppointmentResource;
use App\Http\Resources\LedgerEntry as LedgerEntryResource;
use App\Http\Resources\BlockSchedule as BlockScheduleResource;
use App\Http\Resources\Course as CourseResource;
use App\Http\Resources\Topic as TopicResource;
use App\Http\Resources\SchedulePlan as SchedulePlanResource;
use App\Http\Utils;

class StudentScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id, $datetime = null)
    {
        $include_weekends = app('settings')['weekends'] == true;
        $year_start = strtotime(app('settings')['start_datetime']);
        $year_end = strtotime(app('settings')['end_datetime']);
        if ($datetime === null) {
            $timestamp = time();
        } else {
            $timestamp = strtotime($datetime);
        }
        $start_time = $timestamp === strtotime('sunday') ? $timestamp : strtotime('previous sunday', $timestamp);
        $end_time = strtotime('+1 weeks -1 days', $start_time);
        $next_time = strtotime('+1 weeks +0 days', $end_time);
        $previous_time = strtotime('-1 weeks +1 days', $start_time);
        
        $student = Student::findOrFail($id);
        $courses = $student->courses($start_time, $end_time)->get();
        $blocks = $student->getBlocks($start_time, $end_time);
        $appointments = $student->appointments();
        $amendments = $student->amendments();
        $plans = $student->plans();

        $student_schedule = [
            'range' => Utils::formatRangeString($start_time, $end_time),
            'next' => $next_time <= $year_end ? date('Y-m-d\TH:i:s', $next_time) : null,
            'previous' => $previous_time >= $year_start ? date('Y-m-d\TH:i:s', $previous_time) : null,
            'min_date' => date('Y-m-d', strtotime(app('settings')['start_datetime'])),
            'max_date' => date('Y-m-d', strtotime(app('settings')['end_datetime']))
        ];

        for ($week_start = $start_time; $week_start < $end_time; $week_start = strtotime('+1 week', $week_start)) {
            $week_end = strtotime('+1 week', $week_start);
            $schedule_by_week = []; // Segmented by week
            for ($time = $week_start; $time < $week_end; $time = strtotime('+1 day', $time)) {
                $day_of_week = date('w', $time) + 1;

                // Skip weekends according to settings
                if (!$include_weekends && ($day_of_week == 1 || $day_of_week == 7)) {
                    continue;
                }
                $date = date('Y-m-d', $time);
                $blocks_of_day = $student->getBlockSchedule($start_time, $end_time)->where('day_of_week', $day_of_week);
                $schedule_day = [
                    'blocks' => [],
                    'date' => Utils::getFullDate($time),
                    'events' => []
                ];
                $blocks_of_day->each(function($block_schedule) use ($amendments, $appointments, $blocks, $date, $student, $plans, &$schedule_day, $year_start, $year_end) {
                    if (strtotime($date. ' '. $block_schedule->end) < $year_start || strtotime($date. ' '. $block_schedule->start) > $year_end) {
                        // Only include blocks within school year
                        return;
                    }
                    $block = $blocks->where('id', $block_schedule->block_id)->first();
                    if ($block) {
                        $day_block = [
                            'id' => $block->id,
                            'flex' => $block->flex == false ? false : true,
                            'label' => $block->label,
                            'start' => date('g:i A', strtotime($date. ' '. $block_schedule->start)),
                            'end' => date('g:i A', strtotime($date. ' '. $block_schedule->end)),
                            'pending' => strtotime($date. ' '. $block_schedule->end) > time()
                        ];
                        $day_block['amendments'] = AmendmentResource::collection($amendments->get()->where('block_id', $block->id)->where('date', $date));
                        $day_block['appointments'] = AppointmentResource::collection($appointments->get()->where('block_id', $block->id)->where('date', $date));                        
                        $day_block['logs'] = LedgerEntryResource::collection(LedgerEntry::where('student_id', $student->id)->whereRaw('DATE(checked_in_at) = DATE(?)', $date)->where('block_id', $block->id)->get());
                        if ($block->flex) {
                            $plan = $plans->get()->where('date', $date)->where('block_id', $block->id)->flatten()->first();
                            if ($plan) {
                                $staff = $plan->staff()->first();
                                $topic_ids = $staff->getTopics()->pluck('id')->toArray();
                                $day_block['scheduled'] = new StaffResource($staff);
                                $topic = TopicSchedule::whereIn('topic_id', $topic_ids)->where('date', $date)->where('block_id', $block_schedule->block_id)->first();
                                if ($topic) {
                                    $day_block['scheduled']['topic'] = $topic->memo;
                                }
                            }
                        }
                        else {
                            $day_block['scheduled'] = new CourseResource(Course::find($block->pivot->course_id));
                        }
                        array_push($schedule_day['blocks'], $day_block);
                    }
                });
                array_push($schedule_by_week, $schedule_day);

            }
            $student_schedule['schedule'] = $schedule_by_week;
        }
        return $student_schedule;
    }

    public function indexProfile($datetime = null)
    {
        $student = auth()->user()->student();
        if ($student) {
            return $this->index($student->id, $datetime);
        }
    }

    public function listStaff(Request $request)
    {
        $date = date('Y-m-d', strtotime($request->input('date')));
        $block_id = $request->input('block_id');

        $staff = Staff::all()->map(function($staff) use($date, $block_id) {
            $topic_ids = $staff->getTopics()->pluck('id')->toArray();
            $topic_schedule = TopicSchedule::whereIn('topic_id', $topic_ids)
                ->get()->where('date', $date)->where('block_id', $block_id)->first();
            $resource = [ 'staff' => new StaffResource($staff)];
            if ($topic_schedule) {
                $topic_resource = new TopicResource($topic_schedule->topic()->first());
                $resource['topic'] = $topic_resource;
            }
            $num_scheduled = SchedulePlan::where('staff_id', $staff->id)
                ->where('date', $date)->where('block_id', $block_id)->count();
            $resource['num_scheduled'] = $num_scheduled;
            $resource['num_remaining'] = $staff->capacity - $num_scheduled >= 0 ? $staff->capacity - $num_scheduled : 0;
            return $resource;
        });

        return $staff;
    }

    public function setPlan(Request $request)
    {
        $date = date('Y-m-d', strtotime($request->input('date')));
        $block_id = $request->input('block_id');
        $staff_id = $request->input('staff_id');
        $student_id = auth()->user()->student()->id;

        SchedulePlan::where('student_id', $student_id)
            ->where('date', $date)->where('block_id', $block_id)
            ->delete();        
        $plan = SchedulePlan::create([
            'date' => $date,
            'block_id' => $block_id,
            'staff_id' => $staff_id,
            'student_id' => $student_id
        ]);

        return new SchedulePlanResource($plan);
    }
}
