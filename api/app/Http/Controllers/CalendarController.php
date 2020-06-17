<?php

namespace App\Http\Controllers;

use App\AirCode;
use App\Block;
use App\Classroom;
use App\Topic;
use App\Http\Resources\AirCode as AirCodeResource;
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
        $user = auth()->user()->account();
        $time = $date ? strtotime($date) : time();
        error_log("\$time = ". date('Y-m-d H:i:s', $time));
        $startTime = strtotime('last monday', $time);
        $dateRange = $this->getDateRangeFromTime($startTime);

        $teacher = Teacher::findOrFail($id);
        $topicIds = $teacher->topics()->get()->pluck('id');
        $appointments = $teacher->appointments()->whereBetween('date', $dateRange)->get();
        $ledgerEntries = $teacher->ledgerEntries()->whereBetween('date', $dateRange)->get();

        $blocks = Block::where('begins_on', '<=', date('Y-m-d H:i:s', $time))
            ->get()
            ->mapToGroups(function ($block, $key) use ($startTime, $topicIds, $appointments, $ledgerEntries, $teacher) {
                $date = date('Y-m-d', strtotime('+' . ($block->week_day - 1) . ' days', $startTime));
                $blockId = $block->id;
                $context = [];

                $topic = $block->topics($date)->get()->whereIn('id', $topicIds)->first();
                if ($topic) {
                    $context['topic'] = $topic;
                    $context['location'] = new ClassroomResource($topic->classroom()->first());
                }

                // Staff-only context items
                if (in_array($user->account_type, ['staff', 'teacher', 'sysadmin'])) {
                    $airCode = AirCode::where('teacher_id', $teacher->id)
                        ->where('block_id', $blockId)
                        ->where('date', $date)
                        ->where('expires_at', '<', date('Y-m-d H:i:s'))
                        ->first();
                    if ($airCode) {
                        $context['airCheckIn'] = new AirCodeResource($airCode);
                    }

                    $blockLedgerEntries = $ledgerEntries
                        ->where('date', $date)
                        ->where('block_id', $blockId);
                    if ($blockLedgerEntries && count($blockLedgerEntries) > 0) {
                        $context['ledgerEntries'] = $blockLedgerEntries;
                    }

                    $blockAppointments = $appointments
                        ->where('date', $date)
                        ->where('block_id', $blockId);
                    if ($blockAppointments && count($blockAppointments) > 0) {
                        $context['appointments'] = $blockAppointments;
                    }
                }

                return [$date => (new BlockResource($block))->context($context)];
            });
        
        return $blocks;

    }

    public function studentCalendar($id, $date = null)
    {
        $student = Student::findOrFail($id);
        $user = auth()->user();
        if ($user->account_type === 'guardian') {
            if (!in_array($student->id, $user->account()->students()->get()->pluck('id'))) {
                return response()->json(['message' => 'This student is not associated with your account.'], 403);
            }
        }

        return [];

    }

    private function getDateRangeFromTime($startTime)
    {
        return [
            date('Y-m-d', $startTime),
            date('Y-m-d', strtotime('+6 days', $startTime))
        ];
    }
}
