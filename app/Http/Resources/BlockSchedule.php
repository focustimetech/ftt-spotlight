<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Block;

class BlockSchedule extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $block = Block::find($this->block_id);
        return [
            'id' => $this->id,
            'flex' => $block->flex == true,
            'label' => $block->label,
            'day_of_week' => $this->day_of_week,
            'start' => $this->start,
            'end' => $this->end
        ];
    }
}
