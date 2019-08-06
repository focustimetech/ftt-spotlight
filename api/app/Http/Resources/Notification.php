<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Utils;

class Notification extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $created_at = strtotime($this->created_at);
        // dd($created_at);
        return [
            'id' => $this->id,
            'date' => date('l, M j, Y', $created_at),
            'time' => date('g:i A', $created_at),
            'approximateTime' => Utils::approximateTime($created_at),
            'body' => $this->body,
            'read' => $this->read == true
        ];
    }
}
