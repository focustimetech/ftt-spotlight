<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SettingsGroup extends Model
{
    public $timestamps = false;

    public function settings()
    {
        return $this->hasMany('App\Setting');
    }
}
