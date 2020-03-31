<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $table = 'students';

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'student_number'
    ];

    public function amendments() {
        return $this->hasMany('App\Amendment');
    }

    public function appointments() {
        return $this->hasMany('App\Appointments');
    }

    public function clusters() {
        return $this->belongsToMany('App\Cluster', 'clusters_students')
            ->withTimestamps();
    }

    public function user() {
        return $this->hasOne('App\User');
    }

    public function ledgerEntries() {
        return $this->hasMany('App\LedgerEntry');
    }
}
