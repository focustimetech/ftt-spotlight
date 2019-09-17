<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Staff;
use App\Student;

class PowerSchedulerController extends Controller
{
    public function schedule(Request $request)
    {
        $students = Student::whereIn('id', $request->input('student_ids'));
        $staff = Staff::whereIn('id', $request->input('staff_ids'));

        
    }
}
