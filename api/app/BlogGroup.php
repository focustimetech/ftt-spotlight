<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BlogGroup extends Model
{
    public function blogPosts()
    {
        return $this->hasMany('App\BlogPost', 'group_id');
    }

    public function isNew()
    {
        $blog_posts = $this->blogPosts()->get();

        return $blog_posts->some(function($blog_post) {
            return $blog_post->isNew();
        });
    }
}
