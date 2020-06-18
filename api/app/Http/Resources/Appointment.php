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
            'teacherId' => $this->teacher_id,
            'studentId' => $this->student_id,
            'blockId' => $this->block_id,
            'classroomId' => $this->classroom_id
        ];
    }
}
