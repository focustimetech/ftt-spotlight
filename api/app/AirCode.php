<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AirCode extends Model
{
    protected $table = 'air_codes';
    protected $fillable = ['code', 'teacher_id', 'block_id', 'date'];

    public function students()
    {
        return $this->belongsToMany('App\Student', 'air_requests', 'air_code_id', 'student_id');
    }
}
