<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BlogVideo extends Model
{
    public function blogPosts()
    {
        return $this->belongsToMany('App\BlogPost');
    }
}
