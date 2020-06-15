<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ArticleGroup extends Model
{
    protected $table = 'article_groups';
    protected $fillable = ['slug', 'title', 'section_id'];

    public function section()
    {
        return $this->belongsTo('App\ArticleSection', 'section_id');
    }

    public function articles()
    {
        return $this->hasMany('App\Article', 'group_id');
    }
}
