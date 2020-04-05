<?php

namespace App\Http\Resources;

use App\Http\Resources\Staff as StaffResource;
use App\Http\Resources\User as UserResource;
use Illuminate\Http\Resources\Json\JsonResource;

class Teacher extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return array_merge(
            ['unavailabilityLimit' => $this->unavailability_limit],
            new StaffResource($this->staff())
        );
    }
}
