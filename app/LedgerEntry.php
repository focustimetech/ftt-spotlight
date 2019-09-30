<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LedgerEntry extends Model
{
    protected $table = "ledger";
    public $timestamps = false;
    protected $fillable = [
        'date', 'time', 'block_id', 'staff_id', 'student_id', 'method'
    ];

    public function block()
    {
        return $this->belongsTo('App\Block', 'id', 'block_id');
    }

    public function getAppointments()
    {
        return App\Appointment::where('student_id', $this->student_id)
            ->where('date', $this->date)
            ->where('block_id', $this->block_id)
            ->get();
    }

    public function staff()
    {
        return $this->belongsTo('App\Staff', 'id', 'staff_id');
    }

    public function student()
    {
        return $this->belongsTo('App\Student', 'id', 'student_id');
    }

    public function topic()
    {
        return $this->hasOne('App\Topic', 'id', 'topic_id');
    }
}
