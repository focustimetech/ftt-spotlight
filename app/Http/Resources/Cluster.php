<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Cluster extends JsonResource
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
            'name' => $this->name,
            'public' => $this->public,
            'hidden' => $this->hidden,
            'students' => \App\Cluster::find($this->id)->students()->get()->map(function($student) {
                return [
                    'id' => $student->id,
                    'name' => $student->getName()
                ];
            })
        ];
    }
}
