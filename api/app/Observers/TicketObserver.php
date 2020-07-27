<?php

namespace App\Observers;

use App\SysAdmin;
use App\Ticket;

class TicketObserver
{
    public function creating(Ticket $ticket)
    {
        if (!$ticket->assignee_id) {
            $ticket->assignee_id = SysAdmin::all()->random()->user_id;
        }
    }
}
