<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $table = 'messages';

    public function sender() {
        return $this->belongsTo('App\User');
    }

    public function recipients() {
        return $this->belongsToMany('App\User', 'message_recipients', 'message_id', 'recipient_id')
            ->withTimestamps();
    }
}
