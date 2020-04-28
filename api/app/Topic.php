<?php

namespace App;

use Utils;
use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    protected $table = 'topics';

    public static function search($query)
    {
        $queryString = Utils::prepareFullTextQuery($query);
        return Topic::whereRaw('MATCH(`memo`) AGAINST("?" IN BOOLEAN MODE))', $queryString)
            ->limit(20);
    }

    public function blocks($date)
    {
        return $this->belongsToMany('App\Topic', 'topics_blocks')
            ->withPivot('date')
            ->wherePivot('date', $date)
            ->withTimestamps();
    }

    public function teacher()
    {
        return $this->belongsTo('App\Teacher');
    }

    public function classroom()
    {
        return $this->belongsTo('App\Classroom');
    }
}
