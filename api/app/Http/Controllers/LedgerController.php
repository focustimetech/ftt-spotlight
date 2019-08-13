<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\LedgerEntry;
use App\Block;
use App\Student;
use App\Staff;
use DB;
use App\Http\Resources\LedgerEntry as LedgerResource;
use App\Http\Resources\Staff as StaffResource;
use App\Http\Resources\Student as StudentResource;

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

        foreach ($student_ids as $student_id) {
            $entry = new LedgerEntry;

            $entry->date = date("Y-m-d", $now);
            $entry->time = $time;
            $entry->block_id = $block->id;
            $entry->staff_id = $staff_id;
            $entry->student_id = $student_id;

            if ($entry->save()) continue;
            else throw new Exception("Students could not be checked in.");
        }

        return new LedgerResource([
            'block' => $block,
            'staff' => new StaffResource(Staff::find($staff_id)),
            'students' => StudentResource::collection(Student::find($student_ids)),
            'date' => date('D, M d', $now),
            'time' => date('g:ia', $now),
            'unixTime' => $now,
            'errors' => $error
        ]);
    }

    /**
     * Determine the current checkin status of the user
     */
    public function status()
    {
        $staff = auth()->user()->staff();
        
    }

    public function enableAir()
    {
        $staff = auth()->user()->staff();
        return $staff->enableAirCheckIn();
    }
}
