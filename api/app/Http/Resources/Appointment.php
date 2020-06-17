<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Appointment extends JsonResource
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
            'memo' => $this->memo,
            'date' => $this->date,
            'teacherId' => $this->teacherId,
            'studentId' => $this->studentId,
            'blockId' => $this->blockId,
            'classroomId' => $this->classroomId
        ];
    }
}
