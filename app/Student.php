<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = [
        'student_number', 'first_name', 'last_name', 'grade', 'initials'
    ];

    public static function findBySN($student_numbers)
    {
        if (is_array($student_numbers)) {
            return Student::whereIn('student_number', $student_numbers)->get();
        } else {
            return Student::where('student_number', $student_numbers)->get()->first();
        }
    }

    public function airRequests()
    {
        return $this->hasMany('App\AirRequest');
    }

    public function amendments()
	{
		return $this->hasMany('App\Amendment');
	}

    public function appointments()
    {
        return $this->hasMany('App\Appointment', 'student_id');
    }

    /**
     * Retreive all Courses that student is enrolled in.
     */
    public function courses($start = null, $end = null)
    {
        $relation = $this->belongsToMany('App\Course', 'enrollment', 'student_id', 'course_id');
    
        if ($start !== null) {
            if ($end === null) {
                $end = time();
            }
            $relation->whereRaw('enrolled_at IS NOT NULL AND enrolled_at < ? AND (dropped_at IS NULL OR dropped_at > ?)',
                [date('Y-m-d H:i:s', $start), date('Y-m-d H:i:s', $end)]);
        }

        return $relation->withPivot('enrolled_by', 'enrolled_at', 'dropped_at')
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

    /**
     * Returns all blocks that a student participates in.
     */
    public function getBlocks($start = null, $end = null)
    {
        return $this->courses($start, $end)->get()->flatMap(function($course) {
            return $course->blocks()->get();
        })->merge(Block::flexBlocks());
    }

    /**
     * Return all scheduled blocks in which the student is enrolled in.
     */
    public function getBlockSchedule($start = null, $end = null)
    {
        return BlockSchedule::whereIn('block_id', $this->getBlocks($start, $end)->pluck('id')->toArray())
            ->orderBy('day_of_week')->orderBy('start')->get();
    }

    
	public function getDisplayName()
	{
		return $this->getName();
	}

    /**
     * Return a string containing the student's full name.
     */
    public function getName()
    {
        return $this->first_name. ' '. $this->last_name;
    }

    public function ledgerEntries()
    {
        return $this->hasMany('App\LedgerEntry', 'student_id');
    }

    public function plans()
    {
        return $this->hasMany('App\SchedulePlan');
    }

    public function user() {
		return $this->hasOne('App\User', 'user_id')->where('account_type', 'student')->first();
	}
}
