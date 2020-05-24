<?php

namespace App\Http\Controllers;

use App\Block;
use App\Classroom;
use App\Topic;
use App\Http\Resources\Block as BlockResource;
use App\Http\Resources\Classroom as ClassroomResource;
use App\Http\Resources\Topic as TopicResource;
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
        $startTime = strtotime('previous monday', $time);

        $teacher = auth()->user()->account();
        $topicIds = $teacher->topics()->get()->pluck('id');

        $blocks = Block::where('begins_on', '<=', date('Y-m-d H:i:s', $time))
            ->get()
            ->mapToGroups(function ($block, $key) use ($startTime, $topicIds) {
                $date = date('Y-m-d', strtotime('+' . ($block->week_day - 1) . ' days', $startTime));
                $context = [];

                $context['location'] = new ClassroomResource(Classroom::all()->random());
                $context['topic'] = $block->topics($date)->get()->whereIn('id', $topicIds)->first();
                return [$date => (new BlockResource($block))->context($context)];
            });
        
        return $blocks;

    }

    public function studentCalendar($id, $date = null)
    {
        $student = Student::findOrFail($id);

    }
}
