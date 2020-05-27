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
    public function selfCalendar($date = null)
    {
        $user = auth()->user();
        if ($user->account_type === 'student') {
            return $this->studentCalendar($user->account()->id, $date);
        } else if ($user->account_type === 'teacher') {
            return $this->teacherCalendar($user->account()->id, $date);
        }
    }

    public function teacherCalendar($id, $date = null)
    {
        $time = $date ? strtotime($date) : time();
        $startTime = strtotime('previous monday', $time);
        $dateRange = $this->getDateRangeFromTime($startTime);

        $teacher = auth()->user()->account();
        $topicIds = $teacher->topics()->get()->pluck('id');
        $ledgerEntries = $teacher->ledgerEntries()->whereBetween('date', $dateRange)->get();

        $blocks = Block::where('begins_on', '<=', date('Y-m-d H:i:s', $time))
            ->get()
            ->mapToGroups(function ($block, $key) use ($startTime, $topicIds, $ledgerEntries) {
                $date = date('Y-m-d', strtotime('+' . ($block->week_day - 1) . ' days', $startTime));
                $context = [];
                
                $topic = $block->topics($date)->get()->whereIn('id', $topicIds)->first();
                if ($topic) {
                    $context['topic'] = $topic;
                    $context['location'] = new ClassroomResource($topic->classroom()->first());
                }
               
                return [$date => (new BlockResource($block))->context($context)];
            });
        
        return $blocks;

    }

    public function studentCalendar($id, $date = null)
    {
        $student = Student::findOrFail($id);

    }

    private function getDateRangeFromTime($startTime)
    {
        return [
            date('Y-m-d', $startTime),
            date('Y-m-d', strtotime('+6 days', $startTime))
        ];
    }
}
