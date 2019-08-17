<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

use Illuminate\Database\Eloquent\Model;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    public static function findByUsername($username)
    {
        return User::where('username', $username)->first();
    }

    public function findForPassport($username)
    {
        return $this->where('username', $username)->first();
    }

    public function staff()
    {
        if ($this->account_type === 'staff')
            return Staff::findOrFail($this->id);
        else
            abort(403, 'User is not a staff member.');
    }

    public function student()
    {
        if ($this->account_type === 'student')
            return Student::findOrFail($this->id);
        else
            abort(403, 'User is not a student.');
        
    }

    public function getRole()
    {
        if ($this->account_type === 'staff') {
            $staff = $this->staff();
            return $staff->administrator == true ? 'admin' : 'teacher';
        } else if ($this->account_type === 'student')
            return 'student';
        else
            return null;            
    }

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
}
