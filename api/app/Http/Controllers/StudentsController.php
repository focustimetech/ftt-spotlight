<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Student;
use App\User;
use App\Http\Resources\Student as StudentResource;
use App\Http\Resources\StudentProfile as StudentProfileResource;

class StudentsController extends Controller
{

    public function index()
    {
        // Get all students
        $students = Student::all();

        // return collection of students as a resource
        return StudentResource::collection($students);
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
        $user = $request->isMethod('put') ? $student->user() : new User;

        $student->student_number = $request->input('student_number');
        $student->first_name = $request->input('first_name');
        $student->last_name = $request->input('last_name');
        $student->grade = $request->input('grade');
        $student->initials = $request->input('initials');

        if ($student->save()) {
            $user->account_type = 'student';
            $user->username = $request->input('student_number');
            $user->user_id = $student->id;

            if ($request->isMethod('post')) {
                $user->password = bcrypt($request->input('student_number'));
            }

            if ($user->save()) {
                return new StudentResource($student);
            }
        }
    }

    /**
     * Retreive student by ID (primary key)
     */
    public function show($id)
    {
        $student = Student::findOrFail($id);

        return new StudentResource($student);
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

        if ($student->delete()) {
            return new StudentResource($student);
        }
    }

    /**
     * Retreive a collection of data about the student
     */
    public function profile($id)
    {
        $student = Student::findOrFail($id);

        return new StudentProfileResource($student);
    }
}
