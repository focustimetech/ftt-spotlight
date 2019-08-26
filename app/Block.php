<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Block extends Model
{
    public static function atTime($time)
    {
        return BlockSchedule::atTime($time);
    }

    public static function flexBlocks()
    {
        return Block::where('flex', 1)->get();
    }

    public function courses()
    {
        return $this->belongsToMany('App\Course', 'block_course', 'block_id', 'course_id')
            ->withPivot('staff_id');
    }

    /**
     * Get the Topic for the block from the given staff member's ID and time
     */
    public function getTopic($staff_id, $time)
    {
        $date = date('Y-m-d', $time);
        $staff = Staff::findOrFail($staff_id);
        $topic_ids = $staff->getTopics()->pluck('id')->toArray();
        $block_topics = TopicSchedule::whereIn('topic_id', $topic_ids)
            ->get()->where('date', $date);

        $schedule_blocks = $block_topics->map(function ($block_topic) {
            return ScheduleBlock::find($block_topic->schedule_block_id);
        });

        return $schedule_blocks->block()->first();
    }

    public function schedule()
    {
        return $this->hasMany('App\BlockSchedule', 'block_id', 'id');
    }

    
}
