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

	/*
	function user() {
		return App\User::where('id', $this->id)->first();
	}
	*/
    
}
