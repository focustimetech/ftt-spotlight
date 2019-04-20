<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    public function getBlockNumber() {
        return App\ScheduleEntry::where('course_id', $this->id)
            ->get()->pluck('block_number')->first();
    }
}
