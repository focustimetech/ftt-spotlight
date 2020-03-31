<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CalendarEvent extends Model
{
    protected $table = 'events';

    public function staff() {
        return $this->belongsTo('App\Staff');
    }

    public function blocks($date) {
        return $this->belongsToMany('App\Block', 'events_blocks')
            ->withPivot('date')
            ->wherePivot('date', $date)
            ->withTimestamps();
    }
}
