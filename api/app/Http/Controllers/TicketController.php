<?php

namespace App\Http\Controllers;

use Storage;
use App\Ticket;
use App\TicketEvent;
use App\TicketEventFile;
use App\Http\Resources\Ticket as TicketResource;
use App\Http\Resources\TicketEvent as TicketEventResource;
use App\Http\Resources\TicketEventFile as TicketEventFileResource;
use Illuminate\Http\Request;


class TicketController extends Controller {
    public function testDL()
    {
        return Storage::download('https://via.placeholder.com/150.jpg', 'onefifty');
    }
    private function attachFiles($ticketEventId, array $filePaths)
    {
        if (!count($filePaths)) {
            return;
        }
        $ticketEvent = TicketEvent::find($ticketEventId);
        if (!$ticketEvent) {
            return response()->json(['message' => 'No such Ticket Event was found while attaching files.'], 404);
        }
        foreach ($filePaths as $filePath) {
            TicketEventFile::create([
                'ticket_event_id' => $ticketEventId,
                'path' => $filePath
            ]);
        }
    }

    public function index(Request $request) 
    {
        return TicketResource::collection(Ticket::all());
    }

    public function list(Request $request)
    {
        $user = auth()->user();
        if (in_array(!$user->account_type, ['staff', 'teacher', 'sysadmin'])) {
            return response()->json(['message' => 'This user cannot view or create Support Tickets.'], 403);
        }
        $account = $user->account();
        return TicketResource::collection($account->tickets()->get());
    }

    public function ticketEvents($ticketId)
    {
        $user = auth()->user();
        $ticket = Ticket::findOrFail($ticketId);

        if ($ticket->user_id !== $user->id && $user->account_type !== 'sysadmin') {
            return response()->json(['message' => "You do not have access to this Support Ticket.", 403]);
        } else {
            return TicketEventResource::collection($ticket->ticketEvents()->get());
        }
    }

    public function create(Request $request)
    {
        $user = auth()->user();
        $subject = $request->input('subject');
        $body = $request->input('body');
        $filePaths = $request->input('filePaths');

        $ticket = Ticket::create([
            'user_id' => $user->id,
            'subject' => $subject,
            // 'assignee_id' => 0,
        ]);
        $ticketEvent = TicketEvent::create([
            'ticket_id' => $ticket->id,
            'user_id' => $user->id,
            'message' => $body
        ]);
        $this->attachFiles($ticketEvent->id, $filePaths);
        

        return new TicketResource($ticket);
    }

    public function createTicketEvent(Request $request)
    {
        $user = auth()->user();
        $ticketId = $request->route('ticketId');
        $ticket = Ticket::find($ticketId);

        if (!$ticket) {
            return response()->json(['message' => 'No such Ticket was found'], 404);
        } else if ($ticket->user_id !== $user->id && $user->account_type !== 'sysadmin') {

        }
        
        $ticket_event = TicketEvent::create([
            'ticket_id' => $request->input('ticket_id'),
            'action' => $request->input('action'),
            'message' => $request->input('message')
        ]);

        return new TicketEventResource($ticket_event);
    }

    public function updateTicketStatus(Request $request)
    {
        $user = auth()->user();
        $ticketId = $request->route('ticketId');
        if ($user->account_type !== 'sysadmin') {
            return response()->json(['message' => "You don't have access to update Tickets."], 403);
        }

        $ticket = Ticket::findOrFail($ticketId);
        $status = $request->input('status');
        $ticket->status = $status;

        if ($ticket->save()) {
            return new TicketResource($ticket);
        }
    }

    public function uploadFile(Request $request)
    {
        $file = $request->file;
        return $file->store('ticketFiles');
    }
}