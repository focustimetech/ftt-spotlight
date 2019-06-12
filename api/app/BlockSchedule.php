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
        }
    }
}
