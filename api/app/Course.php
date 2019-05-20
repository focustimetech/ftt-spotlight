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
            ->withPivot('staff_id')->as('owner');
            // ->withTimestamps();
    }

    public function enrollStudents($students)
    {
        return $this->students()->attach($students);
    }

    public function dropStudents($students)
    {
        return $this->students()->detach($students);
    }
}
