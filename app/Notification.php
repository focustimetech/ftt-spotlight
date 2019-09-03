<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    public function archive()
    {
        $this->attributes['archived'] = true;
        $this->save();
    }

    public function markRead()
    {
        $this->attributes['read'] = true;
        $this->save();
    }

    public function markUnread()
    {
        $this->attributes['read'] = false;
        $this->save();
    }

    public function staff()
    {
        return $this->belongsTo('App\Staff');
    }

    public function unarchive()
    {
        $this->attributes['archived'] = false;
        $this->save();
    }
}
