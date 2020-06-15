<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ArticleSection extends Model
{
    protected $table = 'article_sections';
    protected $fillable = ['slug', 'title'];

    public function groups()
    {
        return $this->hasMany('App\ArticleGroup', 'section_id');
    }

    public function articles()
    {
        return $this->hasManyThrough('App\Article', 'App\ArticleGroup', 'section_id', 'group_id', 'id', 'id');
    }
}
