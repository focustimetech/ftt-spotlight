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

        $block_schedule = BlockSchedule::flexBlocks();
        $num_blocks = $block_schedule->length(); // Number of BlockSchedules
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
        $day_of_week = date('w', $start) + 1;
        $segment_end = $start;
        
        // Set up pointers
        for ($block_pointer = 0; $block_schedule[$block_pointer]->start <= $time && $block_schedule[$block_pointer]->end > $time; $block_pointer ++);

        // Set up attendance report
        $attendance = [
            'start' => date('Y-m-d H:i:s', $start),
            'end' => date('Y-m-d H:i:s', $end),
            'total' => null,
            'attended' => null,
            'missed' => null,
            'segments' => []
        ];

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
                $block_count ++;
                $block_pointer = ($block_pointer + 1) % $num_blocks; // Increment the block pointer
                $time = $block_schedule[$block_pointer]->start;
            }

            $total = $block_count * $num_students;
            $attended = 
        }
        
    }

    private static function getNextSegment($time, $segment) {
        return strtotime("+1 $segment", date('Y-m-d H:i:s', $time));
    }
}