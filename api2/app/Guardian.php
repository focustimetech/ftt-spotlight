<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Guardian extends Model
{
    protected $table = 'guardians';

    public function students() {
        return $this->belongsToMany('App\Student', 'guardians_students')
            ->withTimestamps();
    }

    public function user() {
        return $this->hasOne('App\User');
    }
}
