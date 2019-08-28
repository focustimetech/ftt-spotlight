<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Block;
use App\Staff;
use App\Http\Resources\Block as BlockResource;
use App\Http\Resources\Staff as StaffResource;

class TopicSchedule extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $topic = $this->topic()->first();
        return [
            'id' => $this->id,
            'topic_id' => $this->topic_id,
            'block' => new BlockResource(Block::find($this->block_id)),
            'date' => $this->date,
            'topic' => $topic->topic,
            'color' => $topic->color,
            'deleted' => $topic->deleted == true,
            'staff' => new StaffResource(Staff::find($topic->staff_id))
        ];
    }
}
