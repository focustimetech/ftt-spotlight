<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Staff;
use App\Http\Resources\Staff as StaffResource;

class Topic extends JsonResource
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
            'topic' => $this->topic,
            'color' => $this->color,
            'deleted' => $this->deleted == true,
            'staff' => new StaffResource(Staff::find($this->staff_id))
        ];
    }
}
