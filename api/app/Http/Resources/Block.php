<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Block extends JsonResource
{
    protected $context = [];

    public function context(array $context)
    {
        $this->context = $context;
        return $this;
    }

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
            'label' => $this->label,
            'startTime' => $this->start_time,
            'endTime' => $this->end_time,
            'beingsOn' => $this->begins_on,
            'endsOn' => $this->ends_on,
            'weekDay' => $this->week_day,
            'context' => $this->context
        ];
    }
}
