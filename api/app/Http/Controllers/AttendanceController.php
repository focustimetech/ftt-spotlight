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
            $start_time = $course->enrolled_at;
            $end_time = $course->dropped_at ?? $now;
            $block_schedule = $student->blockSchedule();
            $schedule_index = 0;

            // First, get the very first block in which attendance is recorded
            while (date('w', $start_time))
        });
    }
}
