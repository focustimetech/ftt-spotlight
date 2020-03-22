<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Amendment extends Model
{
    protected $fillable = [
        'student_id', 'staff_id', 'block_id', 'date', 'memo'
    ];

    public function staff()
    {
        return $this->belongsTo('App\Staff');
    }

    public function student()
    {
        return $this->belongsTo('App\Student');
    }

    public function block()
    {
        return $this->belongsTo('App\Block');
    }
}
