<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\Staff as StaffResource;
use App\Http\Resources\Student as StudentResource;
use App\Http\Resources\Topic as TopicResource;
use App\Staff;
use App\Student;
use App\Topic;

class LedgerEntry extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        switch ($this->method) {
            case 2:
                $method = 'roll-call';
                break;
            case 1:
                $method = 'air';
                break;
            case 0:
            default:
                $method = 'manual';
                break;
        }

        $params = [
            'id' => $this->id,
            'time' => date('g:i A', strtotime($this->checked_in_at)),
            'staff' => new StaffResource(Staff::find($this->staff_id)),
            'student' => new StudentResource(Student::find($this->student_id)),
            'method' => $method
        ];

        if ($this->topic_id) {
            $params['topic'] = new TopicResource(Topic::find($this->topic_id));
        }

        return $params;
    }
}
