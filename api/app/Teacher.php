<?php

namespace App;

use Utils;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    protected $table = 'teachers';

    protected $attributes = [
        'unavailability_limit' => 30 /** @TODO Use settings provider. */
    ];

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'title',
        'unavailability_limit',
        'user_id'
    ];

    public static function createUser(array $attributes)
    {
        $staff = Staff::createUser([
            'first_name' => $attributes['first_name'],
            'last_name' => $attributes['last_name'],
            'email' => $attributes['email'],
            'account_type' => 'teacher',
            'administrator' => $attributes['administrator']
        ]);

        $teacher = Teacher::create([
            'title' => $attributes['title'],
            'unavailability_limit' => $attributes['unavailability_limit'] ?? Utils::settings('DEFAULT_UNAVAILABILITY_LIMIT'),
            'user_id' => $staff->user()->first()->id
        ]);

        return $teacher;
    }

    public static function search(String $query) {
        $queryString = Utils::prepareFullTextQuery($query);
        return Teacher::whereRaw(
            '`user_id` IN (SELECT `id` from `users` WHERE MATCH(`first_name`, `last_name`) AGAINST(? IN BOOLEAN MODE))',
            $queryString
        )->limit(20);
    }

    public function appointments()
    {
        return $this->hasMany('App\Appointment');
    }
/*
    public function classrooms()
    {
        return $this->belongsToMany('App\Classroom', 'teachers_classrooms')
            ->withPivot('default')
            ->withTimestamps();
    }
*/
    public function clusters()
    {
        return $this->user()->first()->clusters();
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function ledgerEntries()
    {
        return $this->hasMany('App\LedgerEntry');
    }

    public function topics()
    {
        return $this->hasMany('App\Topic');
    }

    public function topic($date, $blockId)
    {
        return Block::findOrFail($blockId)->topics($date)->where('teacher_id', $this->id);
    }

    public function unavailabilities()
    {
        return $this->hasMany('App\Unavailability');
    }

    public function getStaff()
    {
        return Staff::firstWhere('user_id', $this->user_id);
    }

    public function surveys()
    {
        return $this->hasMany('App\Survey');
    }

    public function tickets()
    {
        return $this->hasMany('App\Ticket', 'user_id', 'user_id');
    }
}
