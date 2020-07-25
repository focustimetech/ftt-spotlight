<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TicketEventFile extends Model
{
    protected $fillable = ['path', 'ticket_event_id'];

    public function ticketEvent()
    {
        return $this->belongsTo('App\TicketEvent');
    }
}
