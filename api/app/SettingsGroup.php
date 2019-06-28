<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SettingsGroup extends Model
{
    public function settings()
    {
        return $this->hasMany('App\Setting');
    }
}
