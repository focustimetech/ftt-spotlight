<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TopicSchedule extends Model
{
    protected $table = 'block_topics';
    public $timestamps = false;

    public function topic()
    {
        return $this->hasOne('App\Topic', 'id', 'topic_id');
    }

    public function block()
    {
        return $this->hasOne('App\Block', 'id', 'block_id');
    }
}
