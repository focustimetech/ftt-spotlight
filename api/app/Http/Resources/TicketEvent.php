<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\TicketEventFile;

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
            'action' => $this->action,
            'message' => $this->message,
            'ticketId' => $this->ticket_id,
            'files' => TicketEventFile::collection($this->ticketEventFiles()->get())
        ];
    }
}
