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
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'staff_type' => $this['staff_type'],
            'account_type' => $this->administrator ? 'admin' : 'teacher',
            'administrator' => $this->administrator == true,
            'name' => $this->getName(),
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'title' => $this->title,
            'initials' => $this->initials,
            'color' => $this->color,
            'email' => $this->email,
            'capacity' => $this->capacity
        ];
    }
}
