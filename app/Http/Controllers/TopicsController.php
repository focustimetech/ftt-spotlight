<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Topic;
use App\Http\Resources\Topic as TopicResource;

class TopicsController extends Controller
{
    public function index()
    {
        $topics = auth()->user()->staff()->getTopics();

        return $topics;
    }

    public function store(Request $request)
    {
        $topic = new Topic;

        $topic->memo = $request->input('memo');
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
