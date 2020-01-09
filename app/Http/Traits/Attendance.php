<?php

namespace App\Http\Traits;

use Illuminate\Http\Request;

use App\Block;
use App\BlockSchedule;
use App\LedgerEntry;
use App\Student;

trait Attendance
{
    /**
     * Calculates student attendance for multiple students and various segments.
     * Currently only flex blocks are supported.
     * @param student_ids Array of student IDs
     * @param end_datetime The end of the attendance report, which is the current time by default.
     * @param start_datetime The start of the attendance, inclusive.
     * @param segment The report segment (one of 'day', 'week', 'month')
     */
    public function attendance($student_ids, $start_datetime, $end_datetime = null, $segment = null)
    {
        // dd('Hello world');
        $start = strtotime($start_datetime);
        $end = $end_datetime === null ? time() : strtotime($end_datetime);
        if ($start > $end) {
            $tmp = $start;
            $start = $end;
            $end = $tmp;
        }
        if (!in_array($segment, ['day', 'week', 'month'])) {
            $segment = 'day';
        }

        /**
         * A dictionary is constructed which uses the day of the week as the key. i.e.:
         * [ day_of_week => [ block1, block2, ... ], ... ]
         */
        $block_schedule = BlockSchedule::flexBlocks()->sortBy('start')->groupBy('day_of_week');

        $students = collect();
        $found_student_ids = [];
        foreach ($student_ids as $student_id) {
            $student = Student::find($student_id);
            if ($student) {
                array_push($found_student_ids, $student_id);
                $students->push($student);
            }
        }
        $student_ids = $found_student_ids; // Replace student_id array with those that returned a student
        $ledger_entries = LedgerEntry::whereIn('student_id', $student_ids);
        $num_students = count($students); // Total number of students

        // Set up time iterator
        $time = $start;
        $date = date('Y-m-d', $time);
        $day_of_week = date('w', $start) + 1;

        // Set up block pointer
        $block_pointer = 0;
        while ($block_schedule[$day_of_week][$block_pointer]->start <= $time && $block_schedule[$day_of_week][$block_pointer]->end > $time) {
            $block_pointer ++;
        }

        // Set up attendance report
        $attendance = [
            'start' => date('Y-m-d H:i:s', $start),
            'end' => date('Y-m-d H:i:s', $end),
            'total' => 0,
            'attended' => 0,
            'missed' => 0,
            'percentage' => 0,
            'segments' => [],
            'num_segments' => 0
        ];

        $attendance_segments = [];

        $segment_end = $start;
        $TEST_COUNTER = 0;
        $INDICATOR = 0;
        while ($time < $end && strtotime($date) < $end && $TEST_COUNTER < 1000) {
            // Set up a new segment
            $segment_start = $segment_end;
            $segment_end = self::getNextSegment($segment_start, $segment);
            // Clip end of segment if it passes the end timestamp
            if ($segment_end > $end) {
                $segment_end = $end;
            }

            // Calculate the total number of blocks in the segment
            $block_count = 0;
            while ($time < $segment_end && strtotime($date) < $segment_end && $TEST_COUNTER < 1000) {
                //$TEST_COUNTER ++;
                $INDICATOR ++;
                if ($block_schedule->has($day_of_week)) {
                    //dd($date);
                    $num_blocks = count($block_schedule[$day_of_week]);
                    while ($time < $segment_end && $block_pointer < $num_blocks && $TEST_COUNTER < 1000) {
                        $time_next = strtotime("$date " . $block_schedule[$day_of_week][$block_pointer]['start']);
                        $time_diff = $time_next - $time;
                        $time = $time_next;
                        if ($time_diff > 0) {
                            $block_count ++;
                            array_push($attendance_segments, [$date, $block_schedule[$day_of_week][$block_pointer]['block_id']]);
                        }
                        $block_pointer ++; // Increment the block pointer

                        $TEST_COUNTER ++;
                    }
                }
                // Advance the date
                $block_pointer = 0;
                $date = date('Y-m-d', strtotime('+1 day', strtotime($date)));
                $day_of_week = date('w', strtotime($date)) + 1;
                
                if ($date == "1970-01-01") {
                    dd("Bad time = $time");
                }
                
            }
            $segment_start_datetime = date('Y-m-d H:i:s', $segment_start);
            $segment_end_datetime = date('Y-m-d H:i:s', $segment_end);
            $total = $block_count * $num_students;
            $attendance_query_string = implode('OR WHERE ', array_map(function($segment) {
                return "(date = '". $segment[0]. "' AND block_id = ". $segment[1]. ') ';
            }, $attendance_segments));
            $attended = $ledger_entries->whereRaw($attendance_query_string)->get()->count(); 

            array_push($attendance['segments'], [
                'start' => $segment_start_datetime,
                'end' => $segment_end_datetime,
                'total' => $total,
                'attended' => $attended,
                'missed' => $total - $attended,
                'percentage' => $total > 0 ? $attended / $total * 100 : 0
            ]);
        }

        foreach($attendance['segments'] as $segment) {
            $attendance['total'] += $segment['total'];
            $attendance['attended'] += $segment['attended'];
            $attendance['num_segments'] ++;
        }
        // $attendance['missed'] = $attendance['total'] - $attendance['attended'];
        // $attendance['percentage'] = $attendance['attended'] / $attendance['total'] * 100;
        $attendance['TEST_COUNTER'] = $TEST_COUNTER;
        $attendance['INDICATOR'] = $INDICATOR;
        return $attendance;
    }

    private static function getNextSegment($time, $segment) {
        //if (!$time) dd($time);
        return strtotime("+1 $segment", $time);
    }
}