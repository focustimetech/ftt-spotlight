<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

use Illuminate\Database\Eloquent\Model;
use App\Exceptions\UserNotFoundException;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    public static function findByUsername($username)
    {
        $user = User::where('username', $username)->first();
        if ($user)
            return $user;
        else
           throw new UserNotFoundException('Could not find user having username '. $username);
    }

    public function findForPassport($username)
    {
        return $this->where('username', $username)->first();
    }

    public function isStaff()
    {
        return $this->account_type === 'staff';
    }

    public function isStudent()
    {
        return $this->account_type === 'student';
    }

    public function staff()
    {
        if ($this->isStaff())
            return Staff::findOrFail($this->user_id);
        else
            abort(403, 'User is not a staff member.');
    }

    public function student()
    {
        if ($this->isStudent())
            return Student::findOrFail($this->user_id);
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

    public function getDisplayRole()
    {
        $role = $this->getRole();
        switch($role) {
            case 'student':
                return 'Student';
            case 'teacher':
                return 'Teacher';
            case 'admin':
                return 'Administrator';
            default:
                return 'User';
        }
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
