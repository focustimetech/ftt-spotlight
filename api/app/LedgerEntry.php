<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LedgerEntry extends Model
{
    protected $table = "ledger";
    public $timestamps = false;

    public function student() {
        $this->belongsTo('App\Student');
    }
}
