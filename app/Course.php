<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    public function students()
    {
        return $this->belongsToMany('App\Student', 'enrollment', 'course_id', 'student_id');
    }

    public function blocks()
    {
        return $this->belongsToMany('App\Block', 'block_course', 'course_id', 'block_id')
            ->withPivot('staff_id');
            // ->withTimestamps();
    }

    public function staff()
    {
        return $this->belongsToMany('App\Staff', 'block_course', 'course_id', 'staff_id')->get()->first();
    }

    public function enrollStudents($student_ids, $staff_id)
    {
        $pivot = ['enrolled_by' => $staff_id];
        return $this->students()->attach($student_ids, $pivot);
    }

    public function dropStudents($students_ids)
    {
        return $this->students()->detach($student_ids);
    }
}
