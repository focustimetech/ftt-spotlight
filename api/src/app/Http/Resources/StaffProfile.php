<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StaffProfile extends JsonResource
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
            'name' => $this->getName(),
            'administrator' => $this->administrator == true,
            'initials' => $this->initials,
            'color' => $this->color,
            'starred' => auth()->user()->staff()->starred()->get()->some(function($item) {
                return $item->item_id === $this->id && $item->item_type === 'student';
            })
        ];
    }
}
