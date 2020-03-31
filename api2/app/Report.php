<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    protected $table = 'reports';

    public function user() {
        return $this->belongsTo('App\User');
    }
}
