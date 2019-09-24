<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Staff;
use App\Student;
use App\Http\Resources\Staff as StaffResource;
use App\Http\Resources\Student as StudentResource;

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
        switch($this->account_type) {
            case 'staff':
                $details = new StaffResource(Staff::findOrFail($this->user_id));
                break;
            case 'student':
                $details = new StudentResource(Student::findOrFail($this->user_id));
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
            'password_expired' => $this->password_expired
        ];
    }
}
