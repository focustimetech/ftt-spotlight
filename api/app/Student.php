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
    public function getCourses()
    {
        return Course::whereIn('courses.id', $this->getCourseIDs())->get();
    }

    /**
     * Returns all blocks that a student participates in.
     */
    public function getBlocks($include_flex = false)
    {
        $block_numbers = ScheduleEntry::whereIn('course_id', $this->getCourseIDs())
            ->get()
            ->pluck('block_number')
            ->toArray();

        return Block::whereRaw('block_number IN ('. implode($block_numbers, ','). ($include_flex == true ? ') OR flex = 1' : ')'))->get();
    }

    public function getAppointments()
    {
        return Appointment::where('student_id', $this->id)->get();
    }

    public function getLedgerEntries()
    {
        return LedgerEntry::where('student_id', $this->id)->get();
    }

    public function getPlans()
    {
        return [];
    }
}
