<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TicketEvent extends Model
{
    protected $table = 'ticket_events';
    protected $fillable = ['ticket_id', 'action', 'message'];

    public function ticket()
    {
        return $this->belongsTo('App\Ticket');
    }

    public function ticketEventFiles()
    {
        return $this->hasMany('App\TicketEventFile');
    }
}
