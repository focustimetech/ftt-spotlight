<?php

namespace App\Http\Controllers;

use App\AirCode;
use App\Block;
use App\Classroom;
use App\Teacher;
use App\Topic;
use App\Http\Resources\AirCode as AirCodeResource;
use App\Http\Resources\Appointment as AppointmentResource;
use App\Http\Resources\Block as BlockResource;
use App\Http\Resources\Classroom as ClassroomResource;
use App\Http\Resources\LedgerEntry as LedgerEntryResource;
use App\Http\Resources\Topic as TopicResource;
use Illuminate\Http\Request;

class CalendarController extends Controller
{
    private function getDateRangeFromTime($startTime, $n)
    {
        if ($n <= 1) {
            return [date('Y-m-d', $startTime), date('Y-m-d', $startTime)];
        }
        return [
            date('Y-m-d', $startTime),
            date('Y-m-d', strtotime('+' . ($n - 1) . ' days', $startTime))
        ];
    }

    public function selfCalendar(Request $request)
    {
        $date = $request->route('date');
        $n = $request->input('n');
        $user = auth()->user();

        if ($user->account_type === 'student') {
            return $this->studentCalendar($user->account()->id, $date, $n);
        } else if ($user->account_type === 'teacher') {
            return $this->teacherCalendar($user->account()->id, $date, $n);
        }
    }

    public function teacherCalendar($id, $date, $n)
    {
        $numDays = $n ?? 7;
        $user = auth()->user();
        $startTime = strtotime(date('Y-m-d', $date ? strtotime($date) : time()));
        $dateRange = $this->getDateRangeFromTime($startTime, $numDays);
        $endTime = strtotime($dateRange[1]);

        $teacher = Teacher::findOrFail($id);
        $topicIds = $teacher->topics()->get()->pluck('id');
        $appointments = $teacher->appointments()->whereBetween('date', $dateRange)->get();
        $ledgerEntries = $teacher->ledgerEntries()->whereBetween('date', $dateRange)->get();
        $activeBlocks = Block::where('begins_on', '<=', date('Y-m-d H:i:s', $startTime))->get();

        $calendar = [];
        $time = $startTime;
        do {
            $date = date('Y-m-d', $time);
            $blocksOfDate = $activeBlocks->where('week_day', date('N', $time))
                ->flatten()
                ->map(function ($block) use ($date, $topicIds, $appointments, $ledgerEntries, $teacher, $user) {
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
                            $context['ledgerEntries'] = LedgerEntryResource::collection($blockLedgerEntries);
                        }
                        $blockAppointments = $appointments
                            ->where('date', $date)
                            ->where('block_id', $blockId);
                        if ($blockAppointments && count($blockAppointments) > 0) {
                            $context['appointments'] = AppointmentResource::collection($blockAppointments);
                        }
                    }

                    return (new BlockResource($block))->context($context);
                });

            $calendar[$date] = $blocksOfDate;
            $time = strtotime('+1 day', $time);
        } while ($time <= $endTime);

        return $calendar;
    }

    public function studentCalendar($id, $date, $n)
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

    public function classroomCalendar($id, $date = null)
    {
        return [];
    }

    public function allClassroomsCalendar($date)
    {
        return [];
    }
}
