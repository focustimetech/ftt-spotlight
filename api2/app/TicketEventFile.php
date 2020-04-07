<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TicketEventFile extends Model
{
    public function ticketEvent()
    {
        return $this->belongsTo('App\TicketEvent');
    }
}
