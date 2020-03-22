<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\BlogPost;
use App\Http\Resources\BlogPost as BlogPostResource;
use App\Http\Resources\BlogGroup as BlogGroupResource;

class BlogGroup extends JsonResource
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
            'title' => $this->title,
            'subtitle' => $this->subtitle,
            'new' => \App\BlogGroup::find($this->id)->isNew()
        ];
    }
}
