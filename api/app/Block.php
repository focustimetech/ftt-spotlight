<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Block extends Model
{
    public function courses()
    {
        return $this->belongsToMany('App\Course', 'block_course', 'block_id', 'course_id')
            ->withPivot('staff_id');
    }

    public static function atTime($time) {
        $time_of_day = date("H:i:s", $time);
        $day_of_week = date('w', $time) + 1;

        /**
         * @TODO Make sure we use ? for safely passing params with ALL instances of whereRaw
         * @TODO Make config file to determine $mode
         */
        $mode = 'NEXT'; // 'NEXT', 'NONE'
        if ($mode) {
            if ($mode === 'PREV') {
                $block_schedule = BlockSchedule::where('day_of_week', $day_of_week)->where('start', '<=', $time_of_day)->orderBy('end', 'DESC')->get()->first();
            } else if ($mode === 'NEXT') {
                $block_schedule = BlockSchedule::where('day_of_week', $day_of_week)
                    ->where('end', '>=', $time_of_day)
                    ->orderBy('end', 'ASC')
                    ->get()->first();
            }
        } else {
            $block_schedule = BlockSchedule::where('day_of_week', $day_of_week)
                ->where('start', '>=', $time_of_day)
                ->where('end', '<=', $time_of_day)
                ->get()->first();
        }

        if ($block_schedule) {
            return $block_schedule->block();
        }
    }

    public function schedule()
    {
        return $this->hasMany('App\BlockSchedule', 'block_id', 'id');
    }

    public static function flexBlocks()
    {
        return Block::where('flex', 1)->get();
    }
}
