<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ScheduledTopic extends Model
{
    protected $table = 'topics_blocks';

    public function topic()
    {
        return $this->belongsTo('App\Topic');
    }

    public function block()
    {
        return $this->belongsTo('App\Block');
    }
}
