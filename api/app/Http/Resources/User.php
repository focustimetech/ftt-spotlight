<?php

namespace App\Http\Resources;

use App\Http\Resources\Avatar as AvatarResource;
use Illuminate\Http\Resources\Json\JsonResource;

class User extends JsonResource
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
            'firstName' => $this->first_name,
            'lastName' => $this->last_name,
            'name' => $this->getName(),
            'accountType' => $this->account_type,
            'avatar' => new AvatarResource($this)
        ];
    }
}
