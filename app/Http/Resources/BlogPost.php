<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\BlogAuthor;
use App\BlogGroup;
use App\Http\Resources\BlogAuthor as BlogAuthorResource;
use App\Http\Resources\BlogGroup as BlogGroupResource;

class BlogPost extends JsonResource
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
            'body' => $this->body,
            'author' => new BlogAuthorResource(BlogAuthor::find($this->author_id)),
            'groups' => BlogGroupResource::collection(\App\BlogPost::find($this->id)->blogGroups()->get()),
            'date_created' => date('M j, Y', strtotime($this->created_at)),
            'date_modified' => date('M j, Y', strtotime($this->updated_at)),
        ];
    }
}
