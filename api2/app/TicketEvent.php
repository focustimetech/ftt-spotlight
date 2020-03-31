<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TicketEvent extends Model
{
    protected $table = 'ticket_events';

    public function ticket() {
        return $this->belongsTo('App\Ticket');
    }

    public function ticketEventFiles() {
        return $this->hasMany('App\TicketEventFile');
    }
}
