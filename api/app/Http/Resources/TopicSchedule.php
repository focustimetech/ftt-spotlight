<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Block;
use App\Topic;
use App\Http\Resources\Block as BlockResource;
use App\Http\Resources\Topic as TopicResource;

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
            'block' => new BlockResource(Block::find($this->block_id)),
            'date' => $this->date,
            'topic' => new TopicResource(Topic::find($this->topic_id))
        ];
    }
}
