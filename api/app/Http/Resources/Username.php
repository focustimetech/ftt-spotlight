<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Staff;
use App\Student;
use App\SysAdmin;
use App\Http\Resources\Staff as StaffResource;
use App\Http\Resources\Student as StudentResource;
use App\Http\Resources\SysAdmin as SysAdminResource;

class Username extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $details = null;
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
            'username' => $this->username,
            'initials' => $details === null ? null : $details['initials'],
            'color' => $details === null ? null : $details['color']
        ];
    }
}
