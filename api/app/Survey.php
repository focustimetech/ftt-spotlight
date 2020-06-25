<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    protected $table = 'surveys';
    protected $fillable = ['data', 'teacher_id', 'name'];

    public function teacher()
    {
        return $this->belongsTo('App\Teacher');
    }
}
