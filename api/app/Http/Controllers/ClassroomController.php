<?php

namespace App\Http\Controllers;

use App\Classroom;
use App\Http\Resources\Classroom as ClassroomResource;
use Illuminate\Http\Request;

class ClassroomController extends Controller
{
    public function index(Request $request)
    {
        return ClassroomResource::collection(Classroom::all());
    }
}