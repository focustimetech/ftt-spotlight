<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    /**
     * Get attendance from student
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function attendance($student_id)
    {
        $student = App\Student::findOrFail($student_id);
        $courses = $student->courses()->get();
        $attendance = [];
        $now = time();

        $courses->each(function($course) {
            $enrolled_at = $course->enrolled_at;
            $stop_at = $course->dropped_at ?? $now;
            $block_schedule = $student->blockSchedule()->groupBy('day_of_week');
            $schedule_length = count($block_schedule);
            $i = 0;

            // First, get the very first block in which attendance is recorded
            $start_time = date('H:i:s', $enrolled_at);
            $start_day = date('w', $enrolled_at);
            while ($start_day !== $block_schedule[$i]->day_of_week && $start_time >= $block_schedule[$i]->end) {
                $i ++;
                if ($i === $schedule_length) {
                    break;
                }
            }

            // Iterate over each block;
            $date = date('Y-m-d', $enrolled_at);
            $time = $start_time;
            for ($time = strtotime("$date $time"); $time <= $stop_at; $i ++) {
                $block = $block_schedule[$i % $schedule_length];
                
                $time = strtotime("$date $time");
            }
        });
    }
}
