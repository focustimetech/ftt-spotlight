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
        return $this->hasManyThrough('App\Block', 'App\Course');    
    }

    /**
     * Retreive all Courses that student is enrolled in.
     */
    public function courses()
    {
        return $this->belongsToMany('App\Course', 'enrollment', 'student_id', 'course_id');
    }

    public function clusters()
    {
        return $this->belongsToMany('App\Cluster', 'student_cluster', 'student_id', 'cluster_id');
    }

    public function dropCourses($courses)
    {
        return $this->courses()->detach($courses->pluck('id')->toArray());
    }

    public function enrollCourses($courses, $staff_id)
    {
        $pivot = ['enrolled_by' => $staff_id];
        return $this->courses()->attach($courses->pluck('id')->toArray(), $pivot);
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
        return [];
    }

    public function user() {
		return $this->hasOne('App\User', 'user_id')->where('account_type', 'student')->first();
	}
}
