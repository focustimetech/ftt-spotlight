<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BlogAuthor extends Model
{
    public function blogPosts()
    {
        return $this->hasMany('App\BlogPost');
    }
}
