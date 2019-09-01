<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Topic;
use App\TopicSchedule;
use App\Http\Resources\Topic as TopicResource;
use App\Http\Resources\TopicSchedule as TopicScheduleResource;

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
        $topic->color = $request->input('color');
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

    public function createTopicSchedule(Request $request)
    {
        $topic_schedule = new TopicSchedule();
        $staff = auth()->user()->staff();
        $date = date('Y-m-d', strtotime($request->input('date')));

        $topic_schedule->block_id = $request->input('block_id');
        $topic_schedule->date = $date;
        $topic_schedule->topic_id = $request->input('topic_id');

        if ($topic_schedule->save())
            return new TopicScheduleResource($topic_schedule);
    }

    public function deleteTopicSchedule($id)
    {
        $topic_schedule = TopicSchedule::findOrFail($id);
        $staff = auth()->user()->staff();

        if ($topic_schedule->topic()->first()->staff()->first()->id === $staff->id) {
            if ($topic_schedule->delete())
                return new TopicScheduleResource($topic_schedule);
        }
        else
            abort(403, 'Cannot remove Topic.');
        
    }
}
