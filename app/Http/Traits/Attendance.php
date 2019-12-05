<?php

namespace App\Http\Traits;

use Illuminate\Http\Request;

use App\Block;
use App\BlockSchedule;
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
         * { [ day_of_week ] => [ block1, block2, ... ], ... }
         */
        $block_schedule = BlockSchedule::flexBlocks()->sortBy('start')->groupBy('day_of_week');

        $students = collect();
        $found_student_ids = [];
        foreach ($student_ids as $student_id) {
            $student = Student::find($student_id);
            if ($student) {
                array_push($found_student_ids, $student_id);
                $students->push();
            }
        }
        $student_ids = $found_student_ids; // Replace student_id array with those that returned a student
        $ledger_entries = LedgerEntry::whereIn('student_id', $student_ids);
        $num_students = $students->length(); // Total number of students

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
            'segments' => []
        ];

        $segment_end = $start;
        while ($time < $end) {
            // Set up a new segment
            $segment_start = $segment_end;
            $segment_end = self::getNextSegment($segment_start, $segment);
            // Clip end of segment if it passes the end timestamp
            if ($segment_end > $end) {
                $segment_end = $end;
            }

            // Calculate the total number of blocks in the segment
            $block_count = 0;
            while ($time < $segment_end) {
                $num_blocks = count($block_schedule[$day_of_week]);
                while ($time < $segment_end && $block_pointer < $num_blocks) {
                    $time  = strtotime("$date " . $block_schedule[$day_of_week][$block_pointer]);
                    $block_count ++;
                    $block_pointer ++; // Increment the block pointer
                }
                // Advance the date
                $block_pointer = 0;
                $date = date('Y-m-d', strtotime('+1 day', $date));
                $day_of_week = date('w', strtotime($date)) + 1;
            }
            $segment_start_datetime = date('Y-m-d H:i:s', $segment_start);
            $segment_end_datetime = date('Y-m-d H:i:s', $segment_end);
            $total = $block_count * $num_students;
            $attended = $ledger_entries
                ->where('checked_in_at', '>=', $segment_start_datetime)
                ->where('checked_in_at', '<', $segment_end_datetime);
            $segment = [
                'start' => $segment_start_datetime,
                'end' => $segment_end_datetime,
                'total' => $total,
                'attended' => $attended,
                'missed' => $total - $attended,
                'percentage' => $attended / $total * 100
            ];

            array_push($attendance['segments'], $segment);
        }

        foreach($attendance['segments'] as $segment) {
            $attendance['total'] += $segment['total'];
            $attendance['attended'] += $segment['attended'];
        }
        $attendance['missed'] = $attendance['total'] - $attendance['attended'];
        $attendance['percentage'] = $attendance['attended'] / $attendance['total'] * 100;

        return $attendance;
    }

    private static function getNextSegment($time, $segment) {
        return strtotime("+1 $segment", date('Y-m-d H:i:s', $time));
    }
}