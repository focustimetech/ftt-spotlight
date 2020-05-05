<?php

namespace App\Http\Controllers;

use App\Topic;
use App\User;
use App\Http\Resources\Topic as TopicResource;
use Illuminate\Http\Request;

class TopicsController extends Controller
{
    public function index()
    {
        $teacher = auth()->user()->account();
        
        return TopicResource::collection($teacher->topics()->get());
    }

    public function show($id)
    {
        $topic = Topic::findOrFail($id);

        return new TopicResource($topic);
    }

    public function create(Request $request)
    {
        $teacher = auth()->user()->account();
        $topic = Topic::create([
            'memo' => $request->input('memo'),
            'color' => $request->input('color'),
            'classroom_id' => $request->input('classroom_id'),
            'teacher_id' => $teacher->id
        ]);

        return new TopicResource($topic);
    }

    public function update(Request $request)
    {
        $teacher = auth()->user()->account();
        $topic = Topic::findOrFail($request->input('topic'));
        if ($topic->teacher_id !== $teacher->id) {
            return response()->json(['message' => "Cannot update another User's Topic.", 403]);
        }
        $topic->memo = $request->input('memo');
        $topic->classroom_id = $request->input('classroom_id');
        $topic->color = $request->input('color');

        if ($topic->save()) {
            return new TopicResource($topic);
        }
    }

    public function delete($id)
    {
        $teacher = auth()->user()->account();
        $topic = Topic::findOrFail($id);
        if ($topic->teacher_id !== $teacher->id) {
            return response()->json(['message' => "Cannot delete another User's Topic.", 403]);
        }
        if ($topic->delete()) {
            return new TopicResource($topic);
        }
    }
}
