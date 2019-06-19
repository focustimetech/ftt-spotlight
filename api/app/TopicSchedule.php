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

    public function blockSchedule()
    {
        return $this->hasOne('App\BlockSchedule', 'id', 'block_schedule_id');
    }
}
