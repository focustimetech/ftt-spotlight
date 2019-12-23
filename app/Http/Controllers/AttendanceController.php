<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Traits\Attendance;

class AttendanceController extends Controller
{
    use Attendance;
    /**
     * Get total attendance for a given student
     */
    public function getTotalAttendance($student_id)
    {
        return $this->attendance([$student_id], app('settings')['start_datetime'], date('Y-m-d H:i:s'));
    }
}
