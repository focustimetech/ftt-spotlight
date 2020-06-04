<?php

namespace App\Http\Resources;

use App\Http\Resources\User as UserResource;
use Illuminate\Http\Resources\Json\JsonResource;

class Guardian extends JsonResource
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
        /*
        return array_merge(
            [
                // 'accountId' => $this->id,
            ],
            $user->toArray($request)
        );
        */

        return $user->toArray($request);
    }
}
