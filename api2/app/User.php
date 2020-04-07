<?php

namespace App;

use Hash; // Alias exists for Hash facade
use Utils;
use App\Guardian;
use App\Staff;
use App\Student;
use App\Teacher;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'initials',
        'username',
        'password',
        'color',
        'account_type'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', /* 'remember_token' */
    ];

    public static function create(array $attributes)
    {
        $user = static::query()->create([
            'first_name' => $attributes['first_name'],
            'last_name' => $attributes['last_name'],
            'initials' => strtoupper($attributes['first_name'][0] . $attributes['last_name'][0]),
            'username' => $attributes['username'],
            'password' => Hash::make($attributes['username']),
            'color' => Utils::randomColor(),
            'account_type' => $attributes['account_type'],
        ]);

        return $user;
    }

    public static function findByUsername(String $username)
    {
        return User::firstWhere('username', $username);
    }

    public function feedback()
    {
        return $this->hasMany('App\Feedback');
    }

    public function sentMessages()
    {
        return $this->hasMany('App\Message', 'sender_id');
    }

    public function messages()
    {
        return $this->belongsToMany('App\Message', 'message_recipients', 'recipient_id', 'message_id')
            ->withTimestamps();
    }

    public function reports()
    {
        return $this->hasMany('App\Reports');
    }

    public function account()
    {
        switch ($this->account_type) {
            case 'student':
                return Student::firstWhere('user_id', $this->id);
            case 'staff':
                return Staff::firstWhere('user_id', $this->id);
            case 'teacher':
                return Teacher::firstWhere('user_id', $this->id);
            case 'guardian':
                return Guardian::firstWhere('user_id', $this->id);
        }
    }

    public function student()
    {
        return $this->belongsTo('App\Student');
    }

    public function staff()
    {
        return $this->belongsTo('App\Staff');
    }

    public function teacher()
    {
        return $this->belongsTo('App\Teacher');
    }

    public function guardian()
    {
        return $this->belongsTo('App\Guardian');
    }

    public function getName()
    {
        return $this->title
            ? "$this->title. $this->last_name, $this->first_name"
            : "$this->first_name $this->last_name";
    }

    public function hasRole($role)
    {
        if ($role === 'staff') {
            return $this->isStaff();
        } else {
            return $role === $this->account_type;
        }
    }

    public function getAvatar()
    {
        return [
            'initials' => $this->initials,
            'color' => $this->color
        ];
    }

    public function isStaff()
    {
        return in_array($this->account_type, ['staff', 'teacher']);
    }
}
