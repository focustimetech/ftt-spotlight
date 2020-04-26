<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $table = 'students';

    protected $fillable = [
        'first_name',
        'last_name',
        'student_number',
        'grade',
        'user_id'
    ];

    public static function createUser(array $attributes)
    {
        $user = User::create([
            'first_name' => $attributes['first_name'],
            'last_name' => $attributes['last_name'],
            'username' => $attributes['student_number'],
            'account_type' => 'student'
        ]);

        $student = Student::create([
            'grade' => $attributes['grade'],
            'student_number' => $attributes['student_number'],
            'user_id' => $user->id
        ]);

        return $student;
    }

    public static function search(String $query)
    {
        return User::search($query)->where('account_type', 'student')->get();
    }

    public function amendments()
    {
        return $this->hasMany('App\Amendment');
    }

    public function appointments()
    {
        return $this->hasMany('App\Appointments');
    }

    public function clusters()
    {
        return $this->belongsToMany('App\Cluster', 'clusters_students')
            ->withTimestamps();
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function ledgerEntries()
    {
        return $this->hasMany('App\LedgerEntry');
    }
}
