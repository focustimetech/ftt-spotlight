<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    protected $fillable = [
        'staff_id', 'name', 'segment', 'date_range', 'access'
    ];

    public function staff()
    {
        return $this->belongsTo('App\Staff');
    }
}
