<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BlogGroup extends Model
{
    public function blogPosts()
    {
        return $this->belongsToMany('App\BlogPost', 'blog_posts_blog_groups', 'blog_group_id', 'blog_post_id');
    }

    public function isNew()
    {
        $blog_posts = $this->blogPosts()->get();

        return $blog_posts->some(function($blog_post) {
            return $blog_post->isNew();
        });
    }
}
