<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    protected $table = 'staff';

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'administrator'
    ];

    public static function create(array $attributes) {
        $user = User::create([
            'first_name' => $attributes['first_name'],
            'last_name' => $attributes['last_name'],
            'username' => $attributes['email'],
            'account_type' => 'staff'
        ]);

        $staff = static::quere()->create([
            'administrator' => $attributes['administrator'],
            'user_id' => $user->id
        ]);

        return $staff;
    }

    public function amendments() {
        return $this->hasMany('App\Amendment');
    }

    public function calendarEvents() {
        return $this->hasMany('App\CalendarEvent');
    }

    public function user() {
        return $this->belongsTo('App\User');
    }
}
