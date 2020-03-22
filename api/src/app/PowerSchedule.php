<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PowerSchedule extends Model
{
    protected $fillable = [ 'staff_id', 'type' ];
    protected $table = 'power_schedule';
}
