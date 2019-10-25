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
		'staff_type', 'administrator', 'first_name', 'last_name', 'title', 'email', 'initials', 'color'
	];

	protected $hidden = [
		'password', 'remember_token'
	];

	public static function administrators()
	{
		return Staff::where('administrator', true)->get();
	}

	public function amendments()
	{
		return $this->hasMany('App\Amendment');
	}

	public function appointments()
	{
		return $this->hasMany('App\Appointment');
	}

	public function courses()
	{
		return $this->belongsToMany('App\Course', 'block_course', 'staff_id', 'course_id');
	}

	/**
     * Returns all blocks that a staff member participates in.
     */
    public function getBlocks()
    {
        return $this->courses()->get()->flatMap(function($course) {
            return $course->blocks()->get();
        })->merge(Block::flexBlocks());
	}

	public function getBlockSchedule()
	{
		return BlockSchedule::whereIn('block_id', $this->getBlocks()->pluck('id')->toArray())
			->orderBy('day_of_week')->orderBy('start')->get();
	}

	public function getDisplayName()
	{
		return $this->getName();
	}

	public function plans()
	{
		return $this->hasMany('App\SchedulePlan');
	}

	public function airUser()
	{
		return $this->hasOne('App\AirUser');
	}

	public function airRequests()
	{
		return $this->hasMany('App\AirRequest');
	}

	public function delete() {
		User::where('user_id', $this->id)->where('account_type', 'staff')
			->delete();
		Starred::where('staff_id', $this->id)->delete();
		ScheduleEntry::where('staff_id', $this->id)->delete();

		return parent::delete();
	}

	public function disableAirCheckIn()
	{
		$this->airUser()->delete();
	}

	public function enableAirCheckIn()
	{
		if ($this->airUser()->first())
			return;
		$air_user = new AirUser();
		$air_user->staff_id = $this->id;
		$air_user->save();	
		return $air_user;
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

	public function ledgerEntries()
	{
		return $this->hasMany('App\LedgerEntry');
	}

	public function notifications()
	{
		return $this->hasMany('App\Notification')
			->where('archived', false);
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

	public function setCapacity($capacity)
	{
		$this->attributes['capacity'] = $capacity;
		$this->save();
	}

	public function markAllNotificationsRead()
	{
		$this->notifications()->get()->each(function($notification) {
			$notification->markRead();
		});
	}

	public function reports()
	{
		return $this->hasMany('App\Report');
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
