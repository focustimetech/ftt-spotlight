<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    protected $table = 'plans';

    public function block()
    {
        return $this->belongsTo('App\Block');
    }

    public function student()
    {
        return $this->belongsTo('App\Student');
    }

    public function teacher()
    {
        return $this->belongsTo('App\Teacher');
    }
}
