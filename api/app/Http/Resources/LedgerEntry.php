<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Staff as StaffResource;
use App\Staff;

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
        $staff_id = $this->staff_id;
        // var_dump($this);
        return [
            'staff' => new StaffResource(Staff::findOrFail($staff_id)),
            'time' => date('g:i A', strtotime($this->time))
        ];
        
    }
}
