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
    public function store(Request $request)
    {
        $now = time();
        // Log::debug('Checkin in student');
        $staff = auth()->user()->staff();
        $time = date("H:i:s", $now);
        $week_day = date('w', $now) + 1;
        $block = Block::atTime($now);

        $student_numbers = $request->input('student_numbers');
        $student_ids = [];
        $error = [];
        foreach ($student_numbers as $student_number) {
            $student = Student::findBySN($student_number);
            if ($student) {
                array_push($student_ids, $student->id);
            } else {
                array_push($error, $student_number);
            }
        }
        $ledger_entries = collect();
        foreach ($student_ids as $student_id) {
            $entry = new LedgerEntry;

            $entry->date = date('Y-m-d', $now);
            $entry->time = $time;
            $entry->block_id = $block->id;
            $entry->staff_id = $staff->id;
            $entry->student_id = $student_id;
            // Log::debug($entry);
            if ($entry->save())
                $ledger_entries->push($entry);
            else
                throw new Exception("Students could not be checked in.");
        }

        return [
            'success' => LedgerResource::collection($ledger_entries),
            'errors' => $error
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

        $status_blocks = $blocks_of_day->map(function ($block_schedule) use ($date, $staff) {
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
            return [
                'block' => new BlockResource($block_schedule->block()->first()),
                'ledger_entries' => LedgerResource::collection($ledger_entries),
                'planned' => SchedulePlanResource::collection($schedule_plans)
            ];
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
