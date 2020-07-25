<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected $table = 'tickets';
    protected $fillable = ['subject', 'user_id'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function assignee()
    {
        return $this->belongsTo('App\User', 'asignee_id');
    }

    public function ticketEvents()
    {
        return $this->hasMany('App\TicketEvent');
    }
}
