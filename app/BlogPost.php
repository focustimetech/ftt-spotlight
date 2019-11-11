<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BlogPost extends Model
{
    public function blogAuthor()
    {
        return $this->hasOne('App\Author');
    }

    public function blogGroups()
    {
        return $this->belongsToMany('App\BlogGroup', 'blog_posts_blog_groups', 'blog_post_id', 'blog_group_id');
    }

    public function blogVideos()
    {
        return $this->hasMany('App\BlogVideo');
    }

    public function isNew()
    {
        return true;
    }
}
