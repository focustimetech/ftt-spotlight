<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Block extends JsonResource
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
            'block_number' => $this->block_number,
            'flex' => $this->flex == 1 ? true : false,
            'label' => $this->label,
            'day_of_week' => $this->day_of_week,
            'start' => $this->start,
            'end' => $this->end
        ];
    }
}
