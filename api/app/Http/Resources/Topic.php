<?php

namespace App\Http\Resources;

use App\Classroom;
use App\Teacher;
use App\Http\Resources\Classroom as ClassroomResource;
use App\Http\Resources\Teacher as TeacherResource;
use Illuminate\Http\Resources\Json\JsonResource;

class Topic extends JsonResource
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
            'color' => $this->color,
            'classroomId' => $this->classroom_id,
            'teacherId' => $this->teacher_id
        ];
    }
}
