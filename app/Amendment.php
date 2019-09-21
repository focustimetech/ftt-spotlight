<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Amendment extends Model
{
    public function staff()
    {
        return $this->belongsTo('App\Staff');
    }

    public function student()
    {
        return $this->belongsTo('App\Student');
    }

    public function block()
    {
        return $this->belongsTo('App\Block');
    }
}
