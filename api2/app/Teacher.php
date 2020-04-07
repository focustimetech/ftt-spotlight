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
        'unavailability_limit'
    ];

    public static function create(array $attributes) {
        $user = User::create([
            'first_name' => $attributes['first_name'],
            'last_name' => $attributes['last_name'],
            'username' => $attributes['email'],
            'account_type' => 'teacher'
        ]);

        $teacher = static::quere()->create([
            'title' => $attributes['title'],
            'unavailability_limit' => $attributes['unavailability_limit'],
            'user_id' => $user->id
        ]);

        return $teacher;
    }

    public function appointments() {
        return $this->hasMany('App\Appointment');
    }

    public function classrooms() {
        return $this->belongsToMany('App\Classroom', 'teachers_classrooms')
            ->withPivot('default')
            ->withTimestamps();
    }

    public function user() {
        return $this->belongsTo('App\User');
    }

    public function ledgerEntries() {
        return $this->hasMany('App\LedgerEntry');
    }

    public function topics() {
        return $this->hasMany('App\Topic');
    }

    public function unavailabilities() {
        return $this->hasMany('App\Unavailability');
    }

    /**
     * Eloquent relationship between Staff and Teacher. Should exist on Staff model as well.
     * Since it's an eloquent relationship, we can use an observer to `attach()` a Staff model
     * when a new Teacher is created.
     */
    public function staff() {
        // return
    }
}
