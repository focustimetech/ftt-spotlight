<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    protected $table = 'topics';

    public function blocks($date)
    {
        return $this->belongsToMany('App\Topic', 'topics_blocks')
            ->withPivot('date')
            ->wherePivot('date', $date)
            ->withTimestamps();
    }

    public function teacher()
    {
        return $this->belongsTo('App\Teacher');
    }

    public function classroom()
    {
        return $this->belongsTo('App\Classroom');
    }
}
