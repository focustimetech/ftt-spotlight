<?php

namespace App;

use Utils;
use Illuminate\Database\Eloquent\Model;

class Cluster extends Model
{
    protected $table = 'clusters';

    public static function search($query) {
        $queryString = Utils::prepareFullTextQuery($query);
        return Cluster::whereRaw('MATCH(`name`) AGAINST(? IN BOOLEAN MODE)', $queryString)
            ->limit(20);
    }

    public function students()
    {
        return $this->belongsToMany('App\Student', 'clusters_students')
            ->withTimestamps();
    }
}
