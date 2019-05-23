<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    public function delete()
    {
        // Handle delete such that old topics are not removed.
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
