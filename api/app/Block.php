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

    public function flexBlocks()
    {
        return $this->where('flex', 1)->get();
    }
}
