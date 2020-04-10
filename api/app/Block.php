<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Block extends Model
{
    protected $table = 'blocks';

    public function plans($date)
    {
        return $this->hasMany('App\Plan')
            ->where('date', $date);
    }

    public function appointments($date)
    {
        return $this->hasMany('App\Appointment')
            ->where('date', $date);
    }
    
    public function amendments($date)
    {
        return $this->hasMany('App\Amendment')
            ->where('date', $date);
    }

    public function calendarEvents($date)
    {
        return $this->belongsToMany('App\CalendarEvent', 'events_blocks')
            ->withPivot('date')
            ->wherePivot('date', $date)
            ->withTimestamps();
    }

    public function ledgerEntries($date)
    {
        return $this->hasMany('App\LedgerEntry')
            ->where('date', $date);
    }

    public function topics($date)
    {
        return $this->belongsToMany('App\Topic', 'topics_blocks')
            ->withPivot('date')
            ->wherePivot('date', $date)
            ->withTimestamps();
    }
}
