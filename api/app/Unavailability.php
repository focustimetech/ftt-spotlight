<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Unavailability extends Model
{
    public function teacher()
    {
        return $this->belongsTo('App\Teacher');
    }

    public function block()
    {
        return $this->belongsTo('App\Block');
    }
}
