<?php

namespace App\Http\Resources;

use App\Guardian;
use App\Staff;
use App\Student;
use App\Teacher;
use App\Http\Resources\Guardian as GuardianResource;
use App\Http\Resources\Staff as StaffResource;
use App\Http\Resources\Student as StudentResource;
use App\Http\Resources\Teacher as TeacherResource;
use Illuminate\Http\Resources\Json\JsonResource;

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
        switch ($this->account_type) {
            case 'guardian':
                return new GuardianResource(Guadian::firstWhere('user_id', $this->id));
            case 'staff':
                return new StaffResource(Staff::firstWhere('user_id', $this->id));
            case 'student':
                return new StudentResource(Student::firstWhere('user_id', $this->id));
            case 'teacher':
                return new TeacherResource(Teacher::firstWhere('user_id', $this->id));
        }
    }
}
