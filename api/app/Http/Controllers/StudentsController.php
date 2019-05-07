<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Student;
use App\Http\Resources\Student as StudentResource;

class StudentsController extends Controller
{
    /**
     * Retreives all students that are enabled
     *
     * @return \Illuminate\Http\Response
     */
    public function fetchAll()
    {
        // Get teachers
        $students = Student::where('disabled', 0)->get();

        // return collection of staff as a resource
        return StudentResource::collection($students);
    }

    /**
     * Retreives all students that are disabled
     *
     * @return \Illuminate\Http\Response
     */
    public function fetchDisabled()
    {
        // Get teachers
        $student = Student::where('disabled', 1)->get();

        // return collection of staff as a resource
        return StudentResource::collection($student);
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
        $student = $request->isMethod('put') ? Student::findOrFail($request->student_id) : new Student;

        $student->student_number = $request->input('student_number');
        $student->first_name = $request->input('first_name');
        $student->last_name = $request->input('last_name');
        $student->grade = $request->input('grade');
        $student->initials = $request->input('initials');

        if ($student->save()) {
            return $student;
        }
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
     * Retreive student by ID (primary key)
     */
    public function fetchByID($id)
    {
        $student = Student::findOrFail($id);

        return new StudentResource($student);
    }

    /**
     * Retreive student by Student Number
     */
    public function fetchBySN($student_number)
    {
        $student = Student::where('student_number', $student_number)
            ->first();
        
        return new StudentResource($student);
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
        $student = Student::findOrFail($id);

        if ($student->delete()) return new StudentResource($student());
    }

    public function disable(Request $request)
    {
        $student = Student::findOrFail($request->student_id);

        $student->disabled = true;
        
        if ($student->save()) return new StudentResource($student);
    }
}
