<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SysAdmin extends Model
{
    protected $table = 'sysadmins';

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function tickets()
    {
        return $this->hasMany('App\Ticket', 'assignee_id', 'user_id');
    }

    public function assignTicket(Ticket $ticket)
    {
        return $ticket->assignee()->attach($this->user()->first()->id);
    }
}
