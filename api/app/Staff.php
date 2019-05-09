<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
	use HasApiTokens, Notifiable;

	protected $hidden = [
		'password', 'remember_token'
	];

	/**
	 * Return the staff member's name, correctly formatted.
	 */
	public function getName($fullName = true) {
		$name = $this->title. ' '. $this->last_name;
		return $this->first_name && $fullName ? $name. ', '. $this->first_name : $name;
	}

	public function user() {
		return $this->hasOne('App\User', 'user_id')->where('account_type', 'staff')->first();
	}

	public function starred() {
		return $this->hasMany('App\Starred');
	}

	public function scheduleEntries() {
		return $this->hasMany('App\ScheduleEntry');
	}

	public function delete() {
		User::where('user_id', $this->id)->where('account_type', 'staff')
			->delete();
		Starred::where('staff_id', $this->id)->delete();
		ScheduleEntry::where('staff_id', $this->id)->delete();

		return parent::delete();
	}    
}
