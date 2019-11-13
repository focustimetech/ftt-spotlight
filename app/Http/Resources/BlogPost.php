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
        $blog_post = \App\BlogPost::find($this->id);
        return [
            'id' => $this->id,
            'title' => $this->title,
            'body' => $this->body,
            'author' => new BlogAuthorResource(BlogAuthor::find($this->author_id)),
            'groups' => BlogGroupResource::collection($blog_post->blogGroups()->get()),
            'new' => $blog_post->isNew(),
            'date_created' => date('M j, Y', strtotime($this->created_at)),
            'date_modified' => date('M j, Y', strtotime($this->updated_at)),
        ];
    }
}
