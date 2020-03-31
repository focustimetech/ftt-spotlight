<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    protected $table = 'appointments';

    public function teacher() {
        return $this->belongsTo('App\Teacher');
    }

    public function student() {
        return $this->belongsTo('App\Student');
    }

    public function block() {
        return $this->belongsTo('App\Block');
    }

    public function classroom() {
        return $this->belongsTo('App\Classroom');
    }
}
