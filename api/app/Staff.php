<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
	use HasApiTokens, Notifiable;

	protected $fillable = [
		'staff_type', 'administrator', 'first_name', 'last_name', 'title', 'email'
	];

	protected $hidden = [
		'password', 'remember_token'
	];

	public function delete() {
		User::where('user_id', $this->id)->where('account_type', 'staff')
			->delete();
		Starred::where('staff_id', $this->id)->delete();
		ScheduleEntry::where('staff_id', $this->id)->delete();

		return parent::delete();
	}

	/**
	 * Return the staff member's name, correctly formatted.
	 */
	public function getName($fullName = true)
	{
		$name = $this->title. ' '. $this->last_name;
		return $this->first_name && $fullName ? $name. ', '. $this->first_name : $name;
	}

	public function getTopics()
	{
		return $this->hasMany('App\Topic')->where('deleted', false)->get();
	}

	public function notifications()
	{
		return $this->hasMany('App\Notification');
	}

	public function scheduleEntries()
	{
		return $this->hasMany('App\ScheduleEntry');
	}

	public function sendNotification($body = null)
	{
		$notification = new Notification;
		$notification->staff_id = $this->id;
		if ($body !== null) {
			$notification->body = $body;
		}
		$notification->save();
		return $notification;
	}

	public function markAllNotificationsRead()
	{
		$this->notifications()->get()->each(function($notification) {
			$notification->markRead();
		});
	}

	public function starred()
	{
		return $this->hasMany('App\Starred');
	}

	public function user()
	{
		return $this->hasOne('App\User', 'user_id')->where('account_type', 'staff')->first();
	}
}
