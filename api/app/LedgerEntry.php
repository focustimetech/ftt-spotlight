<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LedgerEntry extends Model
{
    protected $table = 'ledger';
    protected $fillable = ['date', 'memo', 'method', 'classroom_id', 'student_id', 'block_id', 'teacher_id'];

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
