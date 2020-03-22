<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    public $timestamps = false;
    protected $fillable = [
        'key', 'description', 'type', 'min', 'max', 'value', 'authenticated', 'group_id'
    ];

    public function settingsGroup()
    {
        return $this->belongsTo('App\SettingsGroup');
    }
}
