<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Block;
use App\BlockSchedule;
use App\Student;

class AttendanceController extends Controller
{
    /**
     * Get total attendance for a given student
     */
    public function attendance($student_id, $start_datetime = null)
    {
        if ($start_datetime === null) {
            $start_time = time();
        } else {
            $start_time = strtotime($start_datetime);
        }
        $student = Student::findOrFail($student_id);
        $student_blocks = []; // Blocks belonging to student
        $settings_start_time = strtotime(app('settings')['start_datetime']);
        $settings_end_time = strtotime(app('settings')['end_datetime']);

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
            $schedule = $schedule_blocks[$block_id];
            if ($student_block['flex'] === true) {
                $start = $start_time > $settings_start_time ? $start_time : $settings_start_time;
                $end = $settings_end_time < time() ? $settings_end_time : time();
            } else {
                // Regular course block
                $enrolled_time = strtotime($student_block['enrolled_at']);

                // Drop timestamp is possible null in the case that student is continuing class
                $dropped_time = $student_block['dropped_at'] ? strtotime($student_block['dropped_at']) : null;
                $start = $start_time > $enrolled_time ? $start_time : $enrolled_time > $settings_start_time ? $enrolled_time : $settings_start_time;
                $end = $dropped_time && $dropped_time < time() ? $dropped_time : time() < $settings_end_time ? time() : $settings_end_time;
            }
        }

        return $student_blocks;
    }
}
