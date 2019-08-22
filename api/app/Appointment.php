<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    /**
     * See commend in LedgerEntry.php
     */
    public function student()
    {
        return $this->belongsTo('App\Student', 'id', 'student_id');
    }

    public function staff()
    {
        return $this->belongsTo('App\Staff', 'id', 'staff_id');
    }

    public function getLedgerEntry()
    {
        return LedgerEntry::where('student_id', $this->student_id)
            ->where('date', $this->date)
            ->where('block_id', $this->block_id)
            ->get();
    }
}
