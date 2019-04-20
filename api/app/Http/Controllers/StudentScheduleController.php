<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StudentScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $start_time = strtotime($request->input('start_date')) === strtotime('sunday') ? (
            strtotime('sunday')
        ) : (
            strtotime('previous sunday', strtotime($request->input('start_date')))
        );
        $end_time = strtotime('+'. $request->input('num_weeks'). ' weeks', $start_time);
        $include_days = $request->input('include_days');
        $student_id = $request->input('student_id');

        $course_ids = \App\Enrollment::where('student_id', $student_id)->pluck('course_id')->toArray();
        $courses = \DB::table('courses')->leftJoin('schedule', 'courses.id', '=', 'schedule.course_id')->select('courses.id', 'courses.name', 'schedule.block_number')->whereIn('courses.id', $course_ids)->get();
        $blocks = \App\Block::select('block_number', 'flex', 'label', 'day_of_week', 'start', 'end')->whereIn('block_number', $courses->pluck('block_number')->toArray())->orWhere(function($query) {$query->where('flex', 1);})->get();
        $appointments = \App\Appointment::select('staff_id', 'block_number', 'date', 'memo')->where('student_id', $student_id)->get();
        $ledger_entries = \App\LedgerEntry::select('date', 'time', 'block_number', 'staff_id')->where('student_id', $student_id)->get();
        $plans = []; //\App\SchedulePlan::select('staff_id, date, block_number')->where('student_id', $student_id)->get();

        $student_schedule = [];

        for ($week_start = $start_time; $week_start < $end_time; $week_start = strtotime('+1 week', $week_start)) {
            $week_end = strtotime('+1 week', $week_start);
            $schedule_by_week = []; // Segmented by week
            for ($time = $week_start; $time < $week_end; $time = strtotime('+1 day', $time)) {
                $day_of_week = date('w', $time) + 1;
                if (in_array($day_of_week, $include_days)) {
                    $date = date('Y-m-d', $time);
                    //echo "$date; ";
                    $schedule_day = [
                        'blocks' => [],
                        'date' => $date,
                        'events' => []
                    ];
                    $blocks_of_day = $blocks->where('day_of_week', $day_of_week);
                    foreach ($blocks_of_day as $block) {
                        $day_block = [];
                        $day_block['appointments'] = $appointments->where('block_Number', $block->block_number)->where('date', $date);
                        $day_block['course'] = $block->getCourseFromStudentID($student_id);
                        $day_block['block'] = $block;
                        // $day_block['flex'] = $block->flex == true;
                        $day_block['log'] = $ledger_entries->where('date', $date)->where('block_number', $block->block_number)->first();
                        if ($block->flex == true) {
                            $day_block['plans'] = $plans->where('date', $date)->where('block_number', $block->block_number);
                        }
                        if (false) {
                            // @TODO implement amendments
                            $day_block['status'] = 'amended';
                        } else if ($day_block['log']) {
                            $day_block['memo'] = 'underwater basket weaving'; //TBD
                            // Check if student skipped out on an appointment
                            $appointment_staff_ids = $day_block['appointments']->pluck('staff_id')->toArray();
                            if (!empty($appointment_staff_ids) && !in_array($appointment_staff_ids, $day_block['log']->staff_id)) {
                                $day_block['status'] = 'wrong-attended';
                            } else {
                                $day_block['status'] = 'attended';
                            }
                        } else {
                            $day_block['status'] = 'missed';
                        }

                        array_push($schedule_day['blocks'], $day_block);
                    }
                    array_push($schedule_by_week, $schedule_day);
                } // else continue
            }
            array_push($student_schedule, $schedule_by_week);
        }
        return $student_schedule;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
