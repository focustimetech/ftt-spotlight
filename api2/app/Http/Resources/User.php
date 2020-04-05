<?php

namespace App\Http\Resources;

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
        $resource = [
            'firstName' => $this->first_name,
            'lastName' => $this->last_name,
            'name' => $this->getName(),
            'avatar' => $this->getAvatar(),
            'accountType' => $this->account_type
        ];
        if ($this->isStaff()) {
            $resource['email'] = $this->username;
        }
    }
}
