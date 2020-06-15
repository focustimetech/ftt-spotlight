<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AirCode extends JsonResource
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
            'code' => $this->code,
            'blockId' => $this->blockId,
            'date' => $this->date,
            'teacherId' => $this->teacherId,
            'students' => Student::collection($this->students()->get())
        ];
    }
}
