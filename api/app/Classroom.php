<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Classroom extends Model
{
    protected $table = 'classrooms';
    
    protected $fillable = [
        'name',
        'teacher_id'
    ];

    public static function search($query)
    {
        return Classroom::limit(20);
    }

    public function teachers($date)
    {
        return $this->belongsToMany('App\Teacher', 'teachers_classrooms')
            ->withPivot('default')
            ->withTimestamps();
    }

    public function teacher() 
    {
        return $this->belongsTo('App\Teacher');
    }

    public function appointments($date)
    {
        return $this->hasMany('App\Appointment')
            ->where('date', $date);
    }

    public function topics()
    {
        return $this->hasMany('App\Topic');
    }
}
