<?php

namespace App\Http\Controllers;

use App\Ticket;
use App\Http\Resources\Ticket as TicketResource;
use App\Http\Resources\TicketEvent as TicketEventResource;
//use App\Http\Resources\TicketEventFile as TicketFileResource;
use App\TicketEvent;
use Illuminate\Http\Request;


class TicketController extends Controller {

    public function index(Request $request) 
    {
        return TicketResource::collection(Ticket::all());
    }

    public function list(Request $request)
    {
        return TicketResource::collection($request->user()->tickets()->get());
    }

    public function history($id)
    {

        $user = auth()->user();
        $ticket = Ticket::findOrFail($id);

        if ($ticket->user_id === $user->id || $ticket->assignee_id === $user->id) {
            return TicketEventResource::collection($ticket->ticketEvents()->get());
        } else {
            return response()->json(['message' => "You do not have access to this Ticket's history.", 403]);
        }
    }

    /* Likely not necessary, just filter index
    public function find() {

    }*/

    public function create(Request $request, String $title, String $message)
    {
        $user = auth()->user();
        $ticket =  Ticket::create([
            'user_id' => $user->id,
            'title' => $title,
            'assignee_id' => 0,
        
        ]);
        return new TicketResource($ticket);
    }

    public function closeTicket(Request $request)
    {
        $user = auth()->user();

        $ticket = Ticket::findOrFail($request->input('ticket_id'));
        
        $ticket_event = TicketEvent::create([
            'ticket_id' => $request->input('ticket_id'),
            'action' => 'close',
            'message' => ""
        ]);

        return new TicketEvent($ticket_event);
    }

    public function reopenTicket(Request $request)
    {
        $user = auth()->user();

        $ticket = Ticket::findOrFail($request->input('ticket_id'));
        
        $ticket_event = TicketEvent::create([
            'ticket_id' => $request->input('ticket_id'),
            'action' => 'open',
            'message' => ""
        ]);

        return new TicketEvent($ticket_event);

    }

    public function reply(Request $request)
    {
        $user = auth()->user();
        
        $ticket = Ticket::findOrFail($request->input('ticket_id'));
        
        $ticket_event = TicketEvent::create([
            'ticket_id' => $request->input('ticket_id'),
            'action' => $request->input('action'),
            'message' => $request->input('message')
        ]);

        return new TicketEvent($ticket_event);

    }
}