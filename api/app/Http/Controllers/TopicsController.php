<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Topic;
use App\Http\Resources\Topic as TopicResource;

class TopicsController extends Controller
{
    public function index()
    {
        $topics = auth()->user()->staff()->topics()->get();

        return $topics;
    }

    public function store(Request $request)
    {
        $topic = $request->isMethod('put') ? Topic::findOrFail($request->input('topic_id')) : new Topic;

        $topic->topic = $request->input('topic');
        $topic->staff_id = auth()->user()->staff()->id;

        if ($topic->save()) {
            return new TopicResource($topic);
        }
    }

    public function show($id)
    {
        $topic = Topic::findOrFail($id);

        return $topic;
    }

    public function destroy($id)
    {
        $topic = Topic::findOrFail($id)->delete();

        if ($topic->save()) {
            return new TopicResource($topic);
        }
    }
}
