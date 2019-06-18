<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    protected $fillable = [
        'topic', 'staff_id'
    ];

    public function delete()
    {
        $this->staff_id = null;
        return $this;
    }

    public function staff()
    {
        return $this->belongsTo('App\Staff');
    }

    public function blockSchedule()
    {
        return $this->belongsTo('App\BlockSchedule');
    }
}
