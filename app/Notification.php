<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    public $fillable = [
        'staff_id', 'initials', 'color', 'body'
    ];

    public function recipients()
    {
        return $this->hasMany('App\NotificationRecipient');
    }

    public function sender()
    {
        return $this->belongsTo('App\Staff');
    }
}
