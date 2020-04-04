<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    protected $table = 'teachers';

    protected $attributes = [
        'unavailability_limit' => 30 /** @TODO Use settings provider. */
    ];

    public function appointments() {
        return $this->hasMany('App\Appointment');
    }

    public function classrooms() {
        return $this->belongsToMany('App\Classroom', 'teachers_classrooms')
            ->withPivot('default')
            ->withTimestamps();
    }

    public function user() {
        return $this->hasOne('App\User');
    }

    public function ledgerEntries() {
        return $this->hasMany('App\LedgerEntry');
    }

    public function topics() {
        return $this->hasMany('App\Topic');
    }

    public function unavailabilities() {
        return $this->hasMany('App\Unavailability');
    }
}
