<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BlockSchedule extends Model
{
    public function blocks()
    {
        return $this->hasMany('App\Block');
    }
}
