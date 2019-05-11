<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Staff as StaffResource;
use App\Staff;

class Course extends JsonResource
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
            'id' => $this['id'],
            'name' => $this['name'],
            'short_name' => $this['short_name'],
            'owner' => new StaffResource(Staff::find($this['owner'])),
            'capacity' => 999,
            'enrolled' => 1,
            'remaining' => 998
        ];
    }
}
