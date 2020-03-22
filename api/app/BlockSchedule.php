<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BlockSchedule extends Model
{
    protected $table = 'block_schedule';
    public $timestamps = false;

    public function block()
    {
        return $this->hasOne('App\Block', 'id', 'block_id');
    }

    public function topic()
    {
        if ($this->block()->flex) {
            return $this->hasMany('App\Topic');
        } else {
            return null;
        }
    }

    public static function flexBlocks()
    {
        return BlockSchedule::all()->filter(function($block_schedule) {
            return $block_schedule->block()->first()->flex == true;
        });
    }

    /**
     * Returns the current BlockSchedule happening. If no BlockSchedule is
     * happening at the given time, the next one is given.
     */
    public static function atTime($time) {
        $time_of_day = date("H:i:s", $time);
        $day_of_week = date('w', $time) + 1;

        $schedule_blocks = BlockSchedule::orderBy('day_of_week')->orderBy('start');
        $first = $schedule_blocks->first();
        $schedule_block = $schedule_blocks
            ->where('day_of_week', '<=', $day_of_week)
            ->where('end', '>=', $time_of_day)
            ->get()
            ->first();
        if ($schedule_block)
            return $schedule_block;
        else
            return $first;
    }
}
