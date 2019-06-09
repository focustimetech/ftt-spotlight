<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Staff;
use App\Student;
use App\Block;
use App\Http\Resources\Staff as StaffResource;
use App\Http\Resources\Block as BlockResource;
use App\Http\Resources\Student as StudentResource;


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
            'staff' => new StaffResource(Staff::find($this->staff_id)),
            'date' => $this->date,
            'block' => Block::find($this->block_id),
            'student' => new StudentResource(Student::find($this->student_id))
        ];
    }
}
