<?php

namespace App\Http\Traits;

use Illuminate\Http\Request;

use App\Block;
use App\BlockSchedule;
use App\Student;

trait Attendance
{
    public function attendance($student_id, $start_datetime = null, $end_datetime = null, $segment = null)
    {
        $now = time(); // Compute current time;
        $student = Student::findOrFail($student_id);
        $student_blocks = []; // Blocks belonging to student
        $settings_start_time = strtotime(app('settings')['start_datetime']);
        $settings_end_time = strtotime(app('settings')['end_datetime']);

        // Calculate start time
        if ($start_datetime === null) {
            $start_time = $settings_start_time;
        } else {
            $start_time = strtotime($start_datetime);
        }

        // First add course blocks
        $courses = $student->courses()->get(); // Get student's enrollment
        $courses->each(function($course) use (&$student_blocks) {
            $blocks = $course->blocks()->get();
            $blocks->each(function($block) use (&$student_blocks, $course) {
                $student_blocks[$block->id] = [
                    'label' => $block->label,
                    'course_id' => $course->id,
                    'enrolled_at' => $course->enrollment->enrolled_at,
                    'dropped_at' => $course->enrollment->dropped_at,
                    'flex' => $block->flex == true,
                    'total' => 0, // Total number of occurances
                    'attended' => 0 // Total number of ledger entries for the block
                ];
            });
        });

        // Second, add flex blocks
        $flex_blocks = Block::flexBlocks();
        $flex_blocks->each(function($flex_block) use (&$student_blocks) {
            $student_blocks[$flex_block->id] = [
                'label' => $flex_block->label,
                'flex' => true,
                'total' => 0,
                'attended' => 0
            ];
        });

        // Get Block Schedules by key
        $schedule_blocks = BlockSchedule::all()->mapToGroups(function($schedule_block) {
            return [$schedule_block->block_id => $schedule_block];
        });

        // Calculate missed and attended counts for each block
        foreach ($student_blocks as $block_id => $student_block) {
            if ($student_block['flex'] === true) {
                // Flex block
                $start = $start_time > $settings_start_time ? $start_time : $settings_start_time;
                $end = $settings_end_time < $now ? $settings_end_time : $now;
            } else {
                // Regular course block
                $enrolled_time = strtotime($student_block['enrolled_at']);

                // Drop timestamp is possible null in the case that student is continuing class
                $dropped_time = $student_block['dropped_at'] ? strtotime($student_block['dropped_at']) : null;

                if ($start_time > $enrolled_time) {
                    $start = $start_time;
                } else {
                    $start = $enrolled_time > $settings_start_time ? $enrolled_time : $settings_start_time;
                }
                if ($dropped_time && $dropped_time < $now) {
                    $end = $dropped_time;
                } else {
                    $end = $now < $settings_end_time ? $now : $settings_end_time;
                }
                // echo "start: $start";
            }

            // With start and end time, calculate the number of block occurances
            $schedule = $schedule_blocks[$block_id];
            $schedule_index = 0; // Index into block schedule
            $schedule_length = count($schedule);
            $total = 0; // The total number of occurances
            // echo "start: $start; end: $end;\n";
            $TEST_COUNT = 0;
            $test_string = '';

            // dd("end: ". date("Y-m-d H:i:s", $end). "\r\n");
            for ($time = $start; $time <= $end; $total ++) {
                $next_datetime = date('Y-m-d', $time). ' '. $schedule[$schedule_index % $schedule_length]['end'];
                $time = strtotime($next_datetime);
                $schedule_index ++;
                if ($schedule_index % ($schedule_length) === 0) {
                    $time = strtotime('+1 day', $time);
                }
            }

            //dd("block_id: $block_id; total: $total");

            // Update total count, calculate attended count from ledger entries
            //dd(date('Y-m-d', $start));
            $attended = $student->ledgerEntries()
                ->where('date', '>=', date('Y-m-d', $start))
                ->where('time', '>=', date('H:i:s', $start))
                
                ->where('date', '<=', date('Y-m-d', $end))
                ->where('time', '<=', date('H:i:s', $end))
                
                ->count();
                //dd($attended);
            

            // echo "total: $total; block_id: $block_id";
            $student_blocks[$block_id]['total'] = $total;
            $student_blocks[$block_id]['attended'] = $attended;
        }

        return $student_blocks;
    }
}