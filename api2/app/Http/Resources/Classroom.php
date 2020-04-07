<?php

namespace App\Http\Resources;

use App\Http\Resources\Teacher as TeacherResource;
use Illuminate\Http\Resources\Json\JsonResource;

class Classroom extends JsonResource
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
            'capacity' => $this->capacity,
            'name' => $this->name,
            'owner' => new TeacherResource($this->teacher()->first())
        ];
    }
}
