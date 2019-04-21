<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\LedgerEntry as LedgerEntryResource;
use App\Http\Resources\Block as BlockResource;
use App\Http\Resources\Course as CourseResource;

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
        $student = \App\Student::find($request->input('student_id'));

        $courses = $student->getCourses();
        $blocks = $student->getBlocks(true);
        $appointments = $student->getAppointments();
        //var_dump($appointments);
        $ledger_entries = $student->getLedgerEntries();
        $plans = $student->getPlans(); //\App\SchedulePlan::select('staff_id, date, block_number')->where('student_id', $student_id)->get();

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
                    $blocks_of_day = $blocks->where('day_of_week', $day_of_week)->sortBy('start_time');
                    foreach ($blocks_of_day as $block) {
                        $day_block = [];
                        $day_block['appointments'] = $appointments->where('block_number', $block->block_number)->where('date', $date);
                        // @TODO getCourseFromStudentID is stupid. Make this a student method ASAP. // Resovled.
                        //$day_block['course'] = new CourseResource($block->getCourseFromStudentID($student->id));
                        $day_block['block'] = new BlockResource($block);
                        if ($day_block['block']['flex'] == false) {
                            $day_block['course'] = new CourseResource($student->getCourseAtBlock($block->block_number));
                        }
                        $day_block['log'] = LedgerEntryResource::collection($ledger_entries->where('date', $date)->where('block_number', $block->block_number))->first();
                        if ($block->flex == true) {
                            $day_block['plans'] = []; //@TODO $plans->where('date', $date)->where('block_number', $block->block_number);
                        }
                        if (false) {
                            // @TODO implement amendments
                            $day_block['status'] = 'amended';
                        } else if ($day_block['log']) {
                            $day_block['memo'] = 'underwater basket weaving'; //TBD
                            // Check if student skipped out on an appointment
                            $appointment_staff_ids = $day_block['appointments']->pluck('staff_id')->toArray();
                            if (!empty($appointment_staff_ids) && !in_array($day_block['log']->staff_id, $appointment_staff_ids)) {
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
