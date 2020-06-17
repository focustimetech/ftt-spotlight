<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LedgerEntry extends JsonResource
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
            'date' => $this->date,
            'memo' => $this->memo,
            'method' => $this->method,
            'studentId' => $this->student_id,
            'blockId' => $this->block_id,
            'teacherId' => $this->teacher_id,
            'createdAt' => $this->created_at
        ];
    }
}
