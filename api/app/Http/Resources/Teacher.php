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
        $staff = new StaffResource($this->getStaff());
        return array_merge(
            $staff->toArray($request),
            [
                // 'accountId' => $this->id,
                'unavailabilityLimit' => $this->unavailability_limit
            ],
        );
    }
}
