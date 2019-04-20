<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Block extends Model
{
    public function getCourseFromStudentID($student_id) {
        // All courses occuring in this block
        $course_ids = ScheduleEntry::where('block_number', $this->block_number)
            ->get()->pluck('block_number')->toArray();

        // The one course occuring in this block that the student has
        $course_id = Enrollment::where('student_id', $student_id)
            ->whereIn('course_id', $course_ids)->get()->pluck('course_id')->first();

        return Course::find($course_id);
        
    }
}
