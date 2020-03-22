<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    protected $fillable = [
        'staff_id', 'name', 'segment', 'date_range', 'access', 'variant'
    ];

    public function staff()
    {
        return $this->belongsTo('App\Staff');
    }

    public function getStars()
    {
        return Starred::where('item_id', $this->id)->where('item_type', 'report')->get();
    }
}
