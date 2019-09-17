<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PowerSchedule extends Model
{
    protected $fillable = [ 'staff_id' ];
    protected $table = 'power_schedule';
}
