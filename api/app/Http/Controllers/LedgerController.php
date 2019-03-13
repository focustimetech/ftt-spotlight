<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\LedgerEntry;
use App\Block;
use App\Student;
use App\Staff;
use DB;
use App\Http\Resources\Ledger as LedgerResource;

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
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //$student_numbers = ;

        $now = strtotime('2019-02-11 08:45:00'); // time();

        $staff_id = $request->input('staff_id');
        $time = date("H:i:s", $now);
        $week_day = date('w', $now) + 1;
        $block = DB::table('blocks')
            ->select('block_number')
            ->whereRaw('? BETWEEN start AND end AND day_of_week = ?', [$time, $week_day])
            ->first();
        $block_number = $block->block_number ?? 0;

        $sn_ids = Student::whereIn('student_number', $request->input('student_number'))
            ->pluck('student_id')
            ->toArray();
        $student_ids = array_merge($sn_ids, $request->input('student_id'));

        foreach ($student_ids as $id) {
            $entry = new LedgerEntry;

            $entry->date = date("Y-m-d", $now);
            $entry->time = $time;
            $entry->block_number = $block_number;
            $entry->staff_id = $request->input('staff_id');
            $entry->student_id = $id;

            if ($entry->save()) continue;
            else throw new Exception("Students could not be checked in.");
        }

        return new LedgerResource([
            'block_number' => $block_number,
            'staff' => Staff::where('id', $request->input('staff_id'))
                ->select('title', 'first_name', 'last_name', 'id')
                ->get()
                ->transform(function($item, $key) {
                    if ($item->title) {
                        $name = $item->title. ' '.
                        substr($item->first_name, 0, 1). ' '.
                        $item->last_name;
                    }
                    else $name = $item->first_name. ' '. $item->last_name;

                    return [
                        'name' => $name,
                        'id' => $item->id
                    ];
                })
                ->toArray(),
            'students' => Student::whereIn('student_id', $student_ids)
                ->select(DB::raw("student_id AS id, CONCAT(first_name, ' ', last_name) AS name"))  
                ->get()              
                ->toArray(),
            'time' => date('H:ia', $now),
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
