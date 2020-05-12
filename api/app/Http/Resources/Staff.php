<?php

namespace App\Http\Resources;

use App\Http\Resources\User as UserResource;
use Illuminate\Http\Resources\Json\JsonResource;

class Staff extends JsonResource
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
                'administrator' => $this->administrator == true,
                'email' => $user->username
            ],
            $user->toArray($request)
        );
    }
}
