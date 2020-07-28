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
    private function attachFiles($ticketEventId, array $files)
    {
        if (!$files || count($files) === 0) {
            return;
        }
        $ticketEvent = TicketEvent::find($ticketEventId);
        if (!$ticketEvent) {
            return response()->json(['message' => 'No such Ticket Event was found while attaching files.'], 404);
        }
        foreach ($files as $file) {
            if (!$file['path']) {
                continue;
            }
            TicketEventFile::create([
                'path' => $file['path'],
                'name' => $file['name'],
                'size' => $file['size'],
                'ticket_event_id' => $ticketEvent->id
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
        if ($user->account_type === 'sysadmin') {
            return $this->index($request);
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
        $message = $request->input('message');
        $filePaths = $request->input('filePaths');

        $ticket = Ticket::create([
            'user_id' => $user->id,
            'subject' => $subject,
        ]);
        $ticketEvent = TicketEvent::create([
            'ticket_id' => $ticket->id,
            'user_id' => $user->id,
            'message' => $message
        ]);
        $this->attachFiles($ticketEvent->id, $filePaths);

        return new TicketResource($ticket);
    }

    public function createTicketEvent(Request $request)
    {
        $user = auth()->user();
        $ticketId = $request->route('ticketId');
        $message = $request->input('message');
        $files = $request->input('files');
        $ticket = Ticket::find($ticketId);

        if (!$ticket) {
            return response()->json(['message' => 'No such Ticket was found'], 404);
        } else if ($ticket->user_id !== $user->id && $user->account_type !== 'sysadmin') {

        }
        
        $ticketEvent = TicketEvent::create([
            'ticket_id' => $ticketId,
            'message' => $message,
            'user_id' => $user->id
        ]);
        $this->attachFiles($ticketEvent->id, $files);

        return new TicketEventResource($ticketEvent);
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
        $storedFilename = Storage::putFile('ticketFiles', $file, 'private');

        return $storedFilename;
    }

    public function downloadFile(Request $request)
    {
        $user = auth()->user();
        $fileId = $request->route('fileId');

        $ticketEventFile = TicketEventFile::findOrFail($fileId);
        $ticketEvent = $ticketEventFile->ticketEvent()->first();
        $path = $ticketEventFile->path;
        $filename = $ticketEventFile->name;

        if ($user->account_type !== 'sysadmin' && $user->id !== $ticketEvent->user_id) {
            return response()->json(['message' => "You don't have access to this file."], 403);
        }

        return response()->download(storage_path("app/$path"), $filename, [
            'Content-Disposition' => "attachment; filename=\"$filename\"",
        ]);
    }
}