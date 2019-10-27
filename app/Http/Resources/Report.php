<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Staff;
use App\Http\Resources\Staff as StaffResource;

class Report extends JsonResource
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
            'staff' => new StaffResource(Staff::findOrFail($this->staff_id)),
            'name' => $this->name,
            'segment' => $this->segment,
            'date_range' => json_decode($this->date_range),
            'date_created' => date('M j, Y, g:iA', strtotime($this->created_at)),
            'access' => $this->access,
            'variant' => $this->variant
        ];
    }
}
