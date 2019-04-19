<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StudentScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $start_time = strtotime($request->input('start_date')) === strtotime('sunday') ? (
            date('Y-m-d', strtotime('sunday'))
        ) : (
            date('Y-m-d', strtotime('previous sunday', strtotime($request->input('start_date'))))
        );
        $end_time = strtotime('+'. $request->input('num_weeks'). ' weeks', $start_time);
        $include_days = $request->input('include_days');
        $student_id = $request->input('student_id');

        $course_ids = App\Enrollment::where('student_id', $student_id)->pluck('course_id')->toArray();
        $courses = DB::table('courses')->leftJoin('schedule', 'courses.id', '=', 'schedule.course_id')->select('courses.id', 'courses.name', 'schedule.block_number')->whereIn('courses.id', $course_ids)->get();
        $blocks = App\Block::select('block_number', 'flex', 'label', 'day_of_week', 'start', 'end')->whereIn('block_number', $courses->pluck('block_number')->toArray())->get();

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
        //
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
