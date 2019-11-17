<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SysAdmin extends Model
{
    public $timestamps = true;
    protected $table = 'sysadmins';
    protected $fillable = [
        'name', 'email', 'initials', 'color'
    ];

    public function getDisplayName()
	{
		return $this->getName();
    }
    
    public function getName()
    {
        return $this->name;
    }

    public function user()
	{
		return $this->hasOne('App\User', 'user_id')->where('account_type', 'sysadmin')->first();
	}
}
