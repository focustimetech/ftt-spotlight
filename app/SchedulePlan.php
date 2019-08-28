<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SchedulePlan extends Model
{
    protected $table = 'plans';
    public $timestamps = false;

    public function staff()
    {
        return $this->hasOne('App\Staff', 'id', 'staff_id');
    }

    public function student()
    {
        return $this->hasOne('App\Student');
    }

    public function block()
    {
        return $this->hasOne('App\Block');
    }
}