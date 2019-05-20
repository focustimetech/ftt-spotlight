<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BlockSchedule extends Model
{
    protected $table = 'block_schedule';
    public $timestamps = false;

    public function block()
    {
        return $this->hasOne('App\Block');
    }
}
