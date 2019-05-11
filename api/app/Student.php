<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    private function getCourseIDs() {
        return Enrollment::where('student_id', $this->id)
            ->pluck('course_id')
            ->toArray();
    }

    /**
     * Retreive all Courses that student is enrolled in.
     */
    public function courses()
    {
        return $this->hasMany('App\Course')->whereIn('courses.id', $this->getCourseIDs())->get();
    }

    /**
     * Retreives the specific course a student has at a given block
     */
    public function getCourseAtBlock($block_number) {
        $course_ids = $this->getCourseIDs();
        $course_id = ScheduleEntry::where('block_number', $block_number)
            ->whereIn('course_id', $course_ids)->pluck('course_id')->first();
        

        return Course::find($course_id);
    }
    /**
     * Returns all blocks that a student participates in.
     */
    public function blocks($include_flex = false)
    {
        $block_numbers = ScheduleEntry::whereIn('course_id', $this->getCourseIDs())
            ->get()
            ->pluck('block_number')
            ->toArray();

        return $this->hasMany('App\Block')->whereRaw('block_number IN ('. implode($block_numbers, ','). ($include_flex == true ? ') OR flex = 1' : ')'))->get();
    }

    public function appointments()
    {
        return $this->hasMany('App\Appointment', 'student_id')->get();
    }

    public function clusters()
    {
        return $this->belongsToMany('App\Cluster', 'student_cluster', 'student_id', 'cluster_id');
    }

    public function ledgerEntries()
    {
        return $this->hasMany('App\LedgerEntry', 'student_id')->get();
    }

    public function plans()
    {
        return [];
    }

    public function user() {
		return $this->hasOne('App\User', 'user_id')->where('account_type', 'student')->first();
	}
}
