<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SysAdmin extends Model
{
    public function user()
	{
		return $this->hasOne('App\User', 'user_id')->where('account_type', 'sysadmin')->first();
	}
}
