<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Staff;
use App\Student;

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
                $details = Staff::findOrFail($this->user_id);
                break;
            case 'student':
                $details = Student::findOrFail($this->user_id);
                break;
        }

        return [
            'id' => $this->id,
            'username' => $this->username,
            'account_type' => $this->account_type,
            'details' => $details
        ];
    }
}
