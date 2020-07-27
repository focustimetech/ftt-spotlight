<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\User;
use App\Http\Resources\TicketEventFile;
use App\Http\Resources\User as UserResource;

class TicketEvent extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'ticketId' => $this->ticket_id,
            'message' => $this->message,
            'user' => new UserResource(User::findOrFail($this->user_id)),
            'files' => TicketEventFile::collection($this->ticketEventFiles()->get()),
            'createdAt' => $this->created_at
        ];
    }
}
