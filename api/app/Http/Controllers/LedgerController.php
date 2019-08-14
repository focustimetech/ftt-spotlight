<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use DB;

use App\Http\Resources\LedgerEntry as LedgerResource;
use App\Http\Resources\SchedulePlan as SchedulePlanResource;
use App\Http\Resources\Staff as StaffResource;
use App\Http\Resources\Student as StudentResource;
use App\LedgerEntry;
use App\Block;
use App\Student;
use App\Staff;
use App\SchedulePlan;

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
        $now = $request->input('time') ?? time();

        $staff_id = $request->input('staff_id') ?? auth()->user()->staff()->id;
        $time = date("H:i:s", $now);
        $week_day = date('w', $now) + 1;
        $block = Block::atTime($now);

        $student_numbers = $request->input('student_numbers');
        $student_ids = $request->input('student_ids');

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

            $entry->date = date("Y-m-d", $now);
            $entry->time = $time;
            $entry->block_id = $block->id;
            $entry->staff_id = $staff_id;
            $entry->student_id = $student_id;

            if ($entry->save())
                $collection->push($entry);
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
    public function status()
    {
        $staff = auth()->user()->staff();
        $status = [];
        //$now = time();
        $now = strtotime('2019-08-14 09:23:00');
        $date = date('Y-m-d', $now);
        $time_string = date('M d', $now);
        $block = Block::atTime($now, -1);
        $ledger_entries = LedgerEntry::where('staff_id', $staff->id)->where('date', $date)->where('block_id', $block->id)->get();
        $schedule_plans = SchedulePlan::where('staff_id', $staff->id)->where('date', $date)->where('block_id', 9)->get();
        //dd($schedule_plans);
        //$topic = Topic::where('staff_id')
        return [
            'block' => $block,
            //'topic' => 
            'air_enabled' => $staff->airUser() != null,
            'air_requests' => $staff->airRequests()->get(),
            'scheduled' => SchedulePlanResource::collection($schedule_plans),
            'checked-in' => LedgerResource::collection($ledger_entries)
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
