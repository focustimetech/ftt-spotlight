<?php

namespace App\Http\Controllers;

use App\Classroom;
use App\Http\Resources\Classroom as ClassroomResource;
use Illuminate\Http\Request;

class ClassroomsController extends Controller
{
    public function index(Request $request)
    {
        return ClassroomResource::collection(Classroom::all());
    }

    public function list(Request $request)
    {
        $classrooms = $request->user()->account()->classrooms()->get();

        return ClassroomResource::collection($classrooms);
    }

    public function show($id)
    {
        $classroom = Classroom::findOrFail($id);

        return new ClassrooomResource($classroom);
    }

    public function create(Request $request)
    {
        $classroom = Classroom::create([
            'name' => $request->input('name'),
            'capacity' => $request->input('capacity'),
            'teacher_id' => $request->user()->account()->id
        ]);

        return new ClassroomResource($classroom);
    }

    public function update(Request $request)
    {
        $classroom = Classroom::findOrFail($request->input('id'));
        if ($classroom->teacher_id !== $request->user()->account()->id) {
            return respone()->json(['message' => "Cannot update another User's Classroom.", 403]);
        }

        $classroom->name = $request->input('name');
        $classroom->capacity = $request->input('capacity');

        if ($classroom->save()) {
            return new ClassroomResource($classroom);
        }
    }

    public function delete($id)
    {
        $classroom = Classroom::findOrFail($id);
        if ($classroom->teacher_id !== $request->user()->account()->id) {
            return respone()->json(['message' => "Cannot delete another User's Classroom.", 403]);
        }

        if ($classroom->delete()) {
            return new ClassroomResource($classroom);
        }
    }
}
