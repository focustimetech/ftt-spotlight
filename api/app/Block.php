<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Block extends Model
{
    public static function atTime($time, $mode = 0) {
        $time_of_day = date("H:i:s", $time);
        $day_of_week = date('w', $time) + 1;

        $schedule_blocks = BlockSchedule::orderBy('day_of_week')->orderBy('start');
        // Select exact block first
        $schedule_block = BlockSchedule::where('day_of_week', $day_of_week)
            ->where('start', '>=', $time_of_day)
            ->where('end', '<=', $time_of_day)
            ->first();

        if ($schedule_block != null) {
            return $schedule_block->block()->first();
        }
        if ($mode === -1) {
            // Round to previous
            $schedule_block = $schedule_blocks
                ->where('start', '<=', $time_of_day)
                ->where('day_of_week', $day_of_week)
                ->first();
            if ($schedule_block == null) {
                $schedule_block = $schedule_blocks->get()->last();
            }
        } else if ($mode === 1) {
            // Round to next
            $schedule_block = $schedule_blocks
                ->where('start', '>=', $time_of_day)
                ->where('day_of_week', $day_of_week)
                ->first();
            if ($schedule_block == null) {
                $schedule_block = $schedule_blocks->get()->first();
            }
        }

        return $schedule_block ? $schedule_block->block()->first() : null;
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
