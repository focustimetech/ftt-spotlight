<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    public function appointments()
    {
        return $this->hasMany('App\Appointment', 'student_id');
    }

    /**
     * Returns all blocks that a student participates in.
     */
    public function blocks()
    {
        return $this->courses()->get()->flatMap(function($course) {
            return $course->blocks()->get();
        });
    }

    /**
     * Retreive all Courses that student is enrolled in.
     */
    public function courses()
    {
        return $this->belongsToMany('App\Course', 'enrollment', 'student_id', 'course_id')
            ->withPivot('enrolled_by', 'enrolled_at', 'dropped_at')
            ->as('enrollment');
    }

    public function clusters()
    {
        return $this->belongsToMany('App\Cluster', 'student_cluster', 'student_id', 'cluster_id');
    }

    public function dropCourses($course_ids)
    {
        return $this->courses()->detach($course_ids);
    }

    public function enrollCourses($course_ids, $staff_id)
    {
        $pivot = ['enrolled_by' => $staff_id];
        return $this->courses()->attach($course_ids, $pivot);
    }

    public static function findBySN($student_numbers)
    {
        if (is_array($student_numbers)) {
            return Student::whereIn('student_number', $student_numbers)->get();
        } else {
            return Student::where('student_number', $student_numbers)->get()->first();
        }
    }

    public function ledgerEntries()
    {
        return $this->hasMany('App\LedgerEntry', 'student_id');
    }

    public function name()
    {
        return $this->first_name. ' '. $this->last_name;
    }

    public function plans()
    {
        return $this->hasMany('App\SchedulePlan');
    }

    public function user() {
		return $this->hasOne('App\User', 'user_id')->where('account_type', 'student')->first();
	}
}
