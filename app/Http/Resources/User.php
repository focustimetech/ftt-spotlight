<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Staff;
use App\Student;
use App\SysAdmin;
use App\Http\Resources\Staff as StaffResource;
use App\Http\Resources\Student as StudentResource;
use App\Http\Resources\SysAdmin as SysAdminResource;
use App\Http\Utils;

class User extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $now = time();
        $disabled_time = $this->disabled_at == null ? null : strtotime($this->disabled_at);
        $is_disabled = $disabled_time && $disabled_time <= $now;
        switch($this->account_type) {
            case 'staff':
                $details = new StaffResource(Staff::findOrFail($this->user_id));
                break;
            case 'student':
                $details = new StudentResource(Student::findOrFail($this->user_id));
                break;
            case 'sysadmin':
                $details = new SysAdminResource(SysAdmin::findOrFail($this->user_id));
                break;
        }

        return [
            'id' => $this->id,
            'username' => $this->username,
            'account_type' => $this->account_type,
            'details' => $details,
            'display_name' => $details->getDisplayName(),
            'display_role' => $this->getDisplayRole(),
            'initials' => $details['initials'],
            'color' => $details['color'],
            'password_expired' => $this->password_expired == true,
            'status' => $disabled_time == null
                ? 'Active'
                : ($is_disabled ? 'Disabled '. strtolower(Utils::approximateTime($disabled_time)) : 'Active until '. $this->disabled_at)
        ];
    }
}
