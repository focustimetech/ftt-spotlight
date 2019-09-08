<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StudentProfile extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $params = [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'grade' => $this->grade,
            'initials' => $this->initials,
            'color' => $this->color,
            'clusters' => \App\Student::findOrFail($this->id)->clusters()->get()
        ];
        if (auth()->user()->isStaff()) {
            $params['starred'] = auth()->user()->staff()->starred()->get()->some(function($item) {
                return $item->item_id === $this->id && $item->item_type === 'student';
            });
        }

        return $params;
    }
}
