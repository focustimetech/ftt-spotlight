<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    public function settingsGroup()
    {
        return $this->belongsTo('App\SettingsGroup');
    }
}
