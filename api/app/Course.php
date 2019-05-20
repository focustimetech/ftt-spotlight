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
            ->withPivot('staff_id')
            ->withTimestamps();
    }
}
