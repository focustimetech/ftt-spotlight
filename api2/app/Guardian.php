<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Guardian extends Model
{
    protected $table = 'guardians';

    public static function findByUserId($userId) {
        return Teacher::firstWhere('user_id', $userId);
    }

    public function students() {
        return $this->belongsToMany('App\Student', 'guardians_students')
            ->withTimestamps();
    }

    public function user() {
        return $this->hasOne('App\User');
    }
}
