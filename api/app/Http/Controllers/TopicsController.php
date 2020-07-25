<?php

namespace App\Http\Controllers;

use App\Block;
use App\Classroom;
use App\Topic;
use App\User;
use App\Http\Resources\Topic as TopicResource;
use Illuminate\Http\Request;

class TopicsController extends Controller
{
    public function index(Request $request)
    {
        return TopicResource::collection(Topic::all());
    }

    public function show($id)
    {
        $topic = Topic::findOrFail($id);

        return new TopicResource($topic);
    }

    public function list(Request $request)
    {
        $teacher = $request->user()->account();
        
        return TopicResource::collection($teacher->topics()->get());
    }

    public function create(Request $request)
    {
        $teacher = auth()->user()->account();
        $classroom = null;
        if ($request->input('classroomName') && $request->input('classroomCapacity')) {
            $classroom = Classroom::create([
                'name' => $request->input('classroomName'),
                'capacity' => $request->input('classroomCapacity'),
                'teacher_id' => $teacher->id
            ]);
        }
        $topic = Topic::create([
            'memo' => $request->input('memo'),
            'color' => $request->input('color'),
            'classroom_id' => $classroom ? $classroom->id : $request->input('classroomId'),
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
        $topic->classroom_id = $request->input('classroomId');
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
            return response()->json(['message' => "Cannot delete another User's Topic."], 403);
        }
        if ($topic->delete()) {
            return new TopicResource($topic);
        }
    }

    public function setTopic(Request $request)
    {
        $user = $request->user();
        $teacher = $user->account();
        $topic = Topic::findOrFail($request->input('topicId'));
        if ($topic->teacher_id !== $teacher->id) {
            return response()->json(['message' => "Cannot schedule another Teacher's Topic."], 403);
        }
        $block = Block::findOrFail($request->input('blockId'));
        $date = $request->input('date');

        if ($block->topics($date)->attach($topic->id)) {
            return new Response('', 204);
        }
    }
}
