<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use Illuminate\Support\Facades\Log;
use DB;

use App\Http\Resources\Block as BlockResource;
use App\Http\Resources\LedgerEntry as LedgerResource;
use App\Http\Resources\SchedulePlan as SchedulePlanResource;
use App\Http\Resources\Staff as StaffResource;
use App\Http\Resources\Student as StudentResource;
use App\LedgerEntry;
use App\Block;
use App\BlockSchedule;
use App\Student;
use App\Staff;
use App\SchedulePlan;
use App\Http\Utils;

class LedgerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $entries = LedgerEntry::all();

        return LedgerResource::collection($entries);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function checkIn(Request $request)
    {
        $staff = auth()->user()->staff();
        $date_time = $request->input('date') ? strtotime($request->input('date')) : time();
        $date = date('Y-m-d', $date_time);
        $block = Block::atTime($date_time);
        $ledger_entries = collect();
        $type = $request->input('type');
        $chips = $request->input('chips') ?? [];
        $error = [];

        foreach ($chips as $chip) {
            if ($type === 'student_id') {
                $method = 2; // roll-call
            } else {
                $method = 0;
            }
            $student = $type === 'student_number' ? Student::findBySN($chip['value']) : Student::find($chip['value']);
            if ($student) {
                $check_in_time = $chip['timestamp'] ? strtotime($chip['timestamp']) : time();
                $check_in_date = $date;
                if (date('Y-m-d', $check_in_time) > $date) {
                    $method = 3; // retroactive
                } else if (date('Y-m-d', $check_in_time) < $date) {
                    $method = 4; // proactive
                }
                $ledger_entry = LedgerEntry::create([
                    'date' => $check_in_date,
                    'checked_in_at' => date('Y-m-d H:i:s', $check_in_time),
                    'block_id' => $block->id,
                    'staff_id' => $staff->id,
                    'student_id' => $student->id,
                    'method' => $method
                ]);
                $ledger_entries->push($ledger_entry);
            } else {
                array_push($error, $chip['value']);
            }
        }

        return [
            'success' => LedgerResource::collection($ledger_entries),
            'errors' => $error,
            'timestamp_string' => date('D M j, Y H:i:s')
        ];
    }

    /**
     * Determine the current checkin status of the user
     */
    public function status($datetime = null)
    {
        $staff = auth()->user()->staff();
        $time = $datetime ? strtotime($datetime) : time();
        $full_date = Utils::getFullDate($time);
        $date = date('Y-m-d', $time);
        $day_of_week = date('w', $time) + 1;
        $blocks_of_day = BlockSchedule::flexBlocks()->where('day_of_week', $day_of_week);
        $status_blocks = [];
        $blocks_of_day->each(function ($block_schedule) use ($date, &$status_blocks, $staff) {
            $ledger_entries = LedgerEntry::where('staff_id', $staff->id)
                ->where('date', $date)
                ->where('block_id', $block_schedule->block_id)
                ->get();
            $ledger_student_ids = $ledger_entries->pluck('student_id')->toArray();
            $schedule_plans = SchedulePlan::whereNotIn('student_id', $ledger_student_ids)
                ->where('staff_id', $staff->id)
                ->where('date', $date)
                ->where('block_id', $block_schedule->block_id)
                ->get();
            array_push($status_blocks, [
                'block' => new BlockResource($block_schedule->block()->first()),
                'ledger_entries' => LedgerResource::collection($ledger_entries),
                'planned' => SchedulePlanResource::collection($schedule_plans)
            ]);
        });

        return [
            'blocks' => $status_blocks,
            'date' => $full_date,
            'next' => date('Y-m-d\TH:i:s', strtotime('+1 day', $time)),
            'previous' => date('Y-m-d\TH:i:s', strtotime('-1 day', $time)),
            'today' => date('Y-m-d\TH:i:s')
        ];
    }

    public function enableAir()
    {
        $staff = auth()->user()->staff();
        return $staff->enableAirCheckIn();
    }

    public function disableAir()
    {
        $staff = auth()->user()->staff();
        return $staff->disableAirCheckIn();
    }
}
