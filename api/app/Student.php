<?php

namespace App;

use Utils;
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

    public static function search($query)
    {
        $queryString = Utils::prepareFullTextQuery($query);
        return Student::whereRaw(
            '`user_id` IN (SELECT `id` from `users` WHERE MATCH(`first_name`, `last_name`) AGAINST(? IN BOOLEAN MODE))',
            $queryString
        )->limit(20);
    }

    public static function findByStudentNumber($studentNumber)
    {
        return Student::firstWhere('student_number', $studentNumber);
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
