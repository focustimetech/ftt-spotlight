<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Student;
use App\User;
use App\Http\Resources\Student as StudentResource;
use App\Http\Resources\StudentProfile as StudentProfileResource;
use App\Http\Traits\Authenticate;
use App\Http\Utils;

class StudentsController extends Controller
{
    use Authenticate;

    public function index()
    {
        // Get all students
        $students = Student::all();

        // return collection of students as a resource
        return StudentResource::collection($students);
    }

    public function create(Request $request)
    {
        $student_number = $request->input('student_number');
        if (User::userExists($student_number))
            abort(409, 'A student by that student number already exists.');
        
        $student = Student::create([
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'initials' => $request->input('initials'),
            'grade' => $request->input('grade'),
            'student_number' => $student_number,
            'color' => Utils::topicColor()
        ]);

        return new StudentResource($student);        
    }

    public function upload(Request $request)
    {
        $verification_response = $this->verify($request);
        if ($verification_response->status() === 200) {
            $file_path = $request->file('file')->store('student-uploads');

            return $file_path;
        } else {
            return $verification_response;
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

    public function getByStudentNumber($student_number)
    {
        $student = Student::findBySN($student_number);

        if ($student)
            return new StudentResource($student);
        else
            return response()->json(['message' => "Student couldn't be found"], 404);
    }

    public function getChipByStudentNumber($student_number)
    {
        $student = Student::findBySN($student_number);

        if ($student) {
            return [
                'student' => new StudentResource($student),
                'datetime' => date('Y-m-d\TH:i:s')
            ];
        } else {
            return response()->json(['message' => "Student couldn't be found"], 404);
        }
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

    /**
     * Retreive student profile information about the authenticated user.
     * Fails if authenticated user is not a student.
     */
    public function authProfile()
    {
        $student = auth()->user()->student();
        return $this->profile($student->id);
    }
}
