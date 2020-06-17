<?php

namespace App\Http\Controllers;

use App\Student;
use App\Http\Resources\Student as StudentResource;
use Illuminate\Http\Request;

class StudentsController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        $students = [];
        if ($user->account_type === 'guardian') {
            $students = $user->account()->students()->get();
        } else {
            $students = Student::all();
        }

        return StudentResource::collection($students);
    }
}
