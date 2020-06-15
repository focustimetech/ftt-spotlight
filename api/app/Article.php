<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $table = 'articles';
    protected $fillable = ['slug', 'title', 'content', 'group_id'];

    public function group()
    {
        return $this->belongsTo('App\ArticleGroup', 'group_id');
    }

    public function section()
    {
        return $this->hasOneThrough('App\ArticleSection', 'App\ArticleGroup', 'group_id', 'section_id', 'id', 'id');
    }
}
