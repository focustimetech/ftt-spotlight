<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AirUser extends Model
{
    public function staff()
    {
        return $this->belongsTo('App\Staff');
    }
}
