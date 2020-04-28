<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cluster extends Model
{
    protected $table = 'clusters';

    public static function search($query) {
        return Cluster::limit(20);
    }

    public function students()
    {
        return $this->belongsToMany('App\Student', 'clusters_students')
            ->withTimestamps();
    }
}
