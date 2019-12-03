<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NotificationRecipient extends Model
{
    public $fillable = ['notification_id', 'staff_id'];
    public $timestamps = false;

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

    public function notification()
    {
        return $this->belongsTo('App\Notification');
    }
}
