<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Starred extends Model
{
    protected $table = 'starred';
    public $timestamps = false;

    public function staff() {
        return $this->belongsTo('App\Staff');
    }
}
