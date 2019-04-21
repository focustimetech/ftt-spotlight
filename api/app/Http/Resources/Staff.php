<?php

namespace App\Http\Resources;

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
        //return parent::toArray($request);
        return [
            'id' => $this->id,
            'account_type' => $this->account_type,
            'administrator' => $this->administrator ? true : false,
            'name' => $this->getName(),
            'email' => $this->email
        ];
    }
}
