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
        return $this->hasOne('App\BlogGroup');
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
