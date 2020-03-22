<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\Block as BlockResource;
use App\Http\Resources\Staff as StaffResource;
use App\Http\Resources\Student as StudentResource;
use App\Block;
use App\Staff;
use App\Student;

class SchedulePlan extends JsonResource
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
            'student' => new StudentResource(Student::find($this->student_id)),
            'staff' => new StaffResource(Staff::find($this->staff_id)),
            'block' => new BlockResource(Block::find($this->block_id)),
            'date' => $this->date
        ];
    }
}
