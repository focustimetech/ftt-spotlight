<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Staff as StaffResource;

use App\Staff;
use App\Topic;

class LedgerEntry extends JsonResource
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
            'date' => date('M j, Y', strtotime($this->date)),
            'time' => date('g:i A', strtotime($this->date. ' '. $this->time)),
            'staff' => new StaffResource(Staff::find($this->staff_id))
        ];
    }
}
