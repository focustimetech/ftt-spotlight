<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StudentProfile extends JsonResource
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
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'grade' => $this->grade,
            'initials' => $this->initials,
            'color' => $this->color,
            'clusters' => \App\Student::findOrFail($this->id)->clusters()->get()
        ];
    }
}
