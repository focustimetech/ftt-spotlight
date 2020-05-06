<?php

namespace App\Http\Controllers;

use App\Block;
use App\Http\Resources\Block as BlockResource;
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
        $dateRange = $this->getDateRangeFromTime($time);
        $startTime = strtotime('monday', $time);
        
        $calendar = [];

        $blocks = Block::where('begins_on', '>=', date('Y-m-d H:i:s', $time))
            ->get()
            ->mapToGroups(function ($block, $key) use ($startTime) {
                return [date('Y-m-d', strtotime('+' . ($block->week_day - 1) . ' days', $startTime)) => new BlockResource($block)];
            });
        
        /*
        $teacher = Teacher::findOrFail($id);

        $appointments = $teacher->appointments()
            ->whereBetween('date', $dateRange)
            ->get();
        $scheduledTopics = $teacher->scheduledTopics()
            ->whereBetween('date', $dateRange)
            ->get();
        */

        return $blocks;

    }

    public function studentCalendar($id, $date = null)
    {
        $student = Student::findOrFail($id);

    }
}
