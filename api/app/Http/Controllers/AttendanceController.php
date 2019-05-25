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

            // First, get the very first block in which attendance is recorded
            $start_time = date('H:i:s', $enrolled_at);
            $start_day = date('w', $enrolled_at);
            $i = 0;
            $k = 0;
            while ($start_day !== $block_schedule[$i]->day_of_week) {
                $i ++;
                if ($i === count($block_schedule)) {
                    break;
                }
            }
            while ($start_time >= $block_schedule[$i][$k]->end) {
                $k ++;
                if ($k === count($block_schedule[$i])) {
                    break;
                }
            }

            // Iterate over each block;
            $week = start_of_week($enrolled_at);
            for (;;) {
                for (; $i < count($block_schedule); $i ++) {
                    $date = $week + $block_schedule[$i][0]->day_of_week;
                    $attendance[$date] = ['attended' => 0, 'missed' => 0];
                    for (; $k < count($block_schedule[$i]); $k ++) {
                        $block = $block_schedule[$i][$k];
                        $block_id = $block->id;
                        $time = $block->start;

                        if (date($date + $time) > $stop_at) {
                            return $attendance;
                        } else {
                            $ledger_entry = null; // = App\LedgerEntry::find(...);
                            if ($ledger_entry == null) {
                                $attendance[$date]['missed'] ++;
                            } else {
                                $attendance[$date]['attended'] ++;
                            }
                        }
                    }
                    $k = 0;
                }
                $i = 0;
                $week ++;
            }
        });
    }
}
