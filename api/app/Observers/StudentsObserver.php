<?php

namespace App\Observers;

use Illuminate\Support\Facades\Hash;
use App\Student;
use App\User;

class StudentsObserver
{
    public function created(Student $student) {
        $user = new User;

        $user->account_type = 'student';
        $user->username = $student->student_number;
        $user->user_id = $student->id;
        $user->password = Hash::make($student->student_number);

        $user->save();
    }
}
