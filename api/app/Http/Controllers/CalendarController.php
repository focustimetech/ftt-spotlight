<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CalendarController extends Controller
{
    private function getDateRangeFromTime($time)
    {
        return [
            date('Y-m-d', strtotime('monday', $time)),
            date('Y-m-d', strtotime('sunday', $time))
        ];
    }

    public function teacherCalendar($id, $date = null)
    {
        $time = $date ? strtotime($date) : time();
        $teacher = Teacher::findOrFail($id);
        $dateRange = $this->getDateRangeFromTime($time);
        $appointments = $teacher->appointments()
            ->whereBetween('date', $dateRange)
            ->get();
        $scheduledTopics = $teacher->scheduledTopics()
            ->whereBetween('date', $dateRange)
            ->get();

    }

    public function studentCalendar($id, $date = null)
    {
        $student = Student::findOrFail($id);

    }
}
