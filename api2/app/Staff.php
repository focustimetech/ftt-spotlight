<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    protected $table = 'staff';

    public function amendments() {
        return $this->hasMany('App\Amendment');
    }

    public function calendarEvents() {
        return $this->hasMany('App\CalendarEvent');
    }

    public function user() {
        return $this->hasOne('App\User');
    }
}
