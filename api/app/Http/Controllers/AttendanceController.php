<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Student;

class AttendanceController extends Controller
{
    /**
     * Get total attendance for a given student
     */
    public function attendance($student_id)
    {
        $student = Student::findOrFail($student_id);
        $blocks = $student->courses()->get()->map(function($course) {
            $block = $course->getBlock();
            return [
                'block_id'
            ];
        });

        $block_schedule = $student->getBlockSchedule()->groupBy('day_of_week')->values()->toArray();
        $attendance = [];

        $courses->each(function($course) use (&$attendance, $student, $block_schedule) {
            $enrolled_at = strtotime($course->enrollment->enrolled_at);
            $stop_at = $course->enrollment->dropped_at ? strtotime($course->enrollment->dropped_at) : time();

            // First, get the very first block in which attendance is recorded
            $start_time = date('H:i:s', $enrolled_at);
            $start_day = date('w', $enrolled_at) + 1;
            for ($i = 0; $i < count($block_schedule) - 1 && $start_day !== $block_schedule[$i][0]['day_of_week']; $i ++);
            for ($k = 0; $k < count($block_schedule[$i]) - 1 && $start_time < $block_schedule[$i][$k]['end']; $k ++);

            // Iterate over each block;
            $day_diff = date('w', $enrolled_at);
            $week = strtotime("-$day_diff days", strtotime(date('Y-m-d', $enrolled_at)));
            for (;;) {
                for (; $i < count($block_schedule); $i ++) {
                    $day_diff = $block_schedule[$i][0]['day_of_week'] - 1;
                    $timestmp = strtotime("+$day_diff days", $week);
                    $date = date('Y-m-d', $timestmp);
                    // echo "Date: $date;";
                    //return;
                    $attendance["$date"] = ['attended' => 0, 'missed' => 0];
                    // echo var_dump($attendance);
                    // return;
                    for (; $k < count($block_schedule[$i]); $k ++) {
                        $block = $block_schedule[$i][$k];
                        $block_id = $block['block_id'];
                        $time = $block['start'];
                        //echo "Date: $date, \$block_id: $block_id; ";

                        if (strtotime("$date $time") > $stop_at) {
                            // echo "strtotime('$date $time') > $stop_at";
                            return;
                        } else {
                            $ledger_entry = $student->ledgerEntries()->where('date', $date)->where('block_id', $block_id)->first();
                            if ($ledger_entry == null) {
                                $attendance["$date"]['missed'] ++;
                                // echo "Missed on $date;";
                            } else {
                                $attendance["$date"]['attended'] ++;
                                // echo "Attended on $date;";
                            }
                        }
                    }
                    $k = 0;
                }
                $i = 0;
                $week = strtotime('+1 week', $week);
            }
        });
        return $attendance;
    }
}
