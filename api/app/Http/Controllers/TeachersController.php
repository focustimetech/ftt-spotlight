<?php

namespace App\Http\Controllers;

use App\Teacher;
use App\Http\Resources\Teacher as TeacherResource;
use Illuminate\Http\Request;

class TeachersController extends Controller
{
    public function index(Request $request)
    {
        return TeacherResource::collection(Teacher::all());
    }

    public function show($id)
    {
        $teacher = Teacher::findOrFail($id);

        return new TeacherResource($teacher);
    }
}
