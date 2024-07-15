<?php

namespace App;

use Utils;
use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    protected $table = 'staff';

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'administrator',
        'user_id'
    ];

    public static function createUser(array $attributes)
    {
        $user = User::create([
            'first_name' => $attributes['first_name'],
            'last_name' => $attributes['last_name'],
            'username' => $attributes['email'],
            'account_type' => 'staff'
        ]);

        $staff = Staff::create([
            'administrator' => $attributes['administrator'] ?? false,
            'user_id' => $user->id
        ]);

        return $staff;
    }

    public static function search(String $query)
    {
        $queryString = Utils::prepareFullTextQuery($query);
        return Staff::whereRaw(
            '`user_id` IN (SELECT `id` from `users` WHERE MATCH(`first_name`, `last_name`) AGAINST(? IN BOOLEAN MODE))',
            $queryString
        )->limit(20);
    }

    public function amendments()
    {
        return $this->hasMany('App\Amendment');
    }

    public function calendarEvents()
    {
        return $this->hasMany('App\CalendarEvent');
    }

    public function clusters()
    {
        return $this->user()->first()->clusters();
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function tickets()
    {
        return $this->hasMany('App\Ticket', 'user_id', 'user_id');
    }
}
