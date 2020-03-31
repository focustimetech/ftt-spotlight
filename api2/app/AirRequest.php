<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AirRequest extends Model
{
    protected $table = 'air_requests';

    public function plan() {
        return $this->hasOne('App\Plan');
    }
}
