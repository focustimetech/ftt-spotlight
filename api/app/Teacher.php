<?php

namespace App;

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
        return Teacher::all();
    }

    public function appointments()
    {
        return $this->hasMany('App\Appointment');
    }

    public function classrooms()
    {
        return $this->belongsToMany('App\Classroom', 'teachers_classrooms')
            ->withPivot('default')
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

    public function topics()
    {
        return $this->hasMany('App\Topic');
    }

    public function unavailabilities()
    {
        return $this->hasMany('App\Unavailability');
    }

    /**
     * Eloquent relationship between Staff and Teacher. Should exist on Staff model as well.
     * Since it's an eloquent relationship, we can use an observer to `attach()` a Staff model
     * when a new Teacher is created.
     */
    public function staff()
    {
        // return
    }
}
