<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Ticket extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $events = $this->ticketEvents()->get();
        $status = count($events) > 0 
            ? $events->sortBy('created_at')->first()->action
            : 'OPEN';
            
        return [
            'id' => $this->id,
            'title' => $this->title,
            'userId' => $this->user_id,
            'assigneeId' => $this->assignee_id,
            'status' => $status
        ];
    }
}
