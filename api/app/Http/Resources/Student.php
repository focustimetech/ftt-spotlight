<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Student extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $user = new UserResource($this->user()->first());
        return array_merge(
            [
                'grade' => $this->grade
            ],
            $user->toArray($request)
        );
    }
}
