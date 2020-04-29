<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Amendment extends Model
{
    protected $table = 'amendments';

    public function block()
    {
        return $this->hasOne('App\Block');
    }

    public function student()
    {
        return $this->belongsTo('App\Student');
    }

    public function staff()
    {
        return $this->belongsTo('App\Staff');
    }
}
