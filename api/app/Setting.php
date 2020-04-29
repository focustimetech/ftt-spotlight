<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'key',
        'value',
        'description'
    ];

    protected $table = 'settings';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $primaryKey = 'key';

    public $timestamps = true;
}
