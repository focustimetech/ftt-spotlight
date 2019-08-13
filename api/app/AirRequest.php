<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AirRequest extends Model
{
    public function student()
    {
        return $this->belongsTo('App\Student');
    }

    public function staff()
    {
        return $this->belongsTo('App\Staff');
    }

    public function block()
    {
        return $this->belongsTo('App\Block');
    }
}
