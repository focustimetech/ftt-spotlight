<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LedgerEntry extends Model
{
    protected $table = 'ledger';

    public function student()
    {
        return $this->belongsTo('App\Student');
    }

    public function block()
    {
        return $this->belongsTo('App\Block');
    }

    public function teacher()
    {
        return $this->belongsTo('App\Teacher');
    }
}
