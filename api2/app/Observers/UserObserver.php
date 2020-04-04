<?php

namespace App\Observers;
use App\Guardian;
use App\Staff;
use App\Student;
use App\Teacher;
use App\User;

class UserObserver
{
    public function created(User $user) {
        switch ($user->account_type) {
            case 'guardian':
                Guardian::create([
                    'user_id' => $user->id
                ]);
                return;
            case 'student':
                Student::create([
                    'user_id' => $user->id
                ]);
                return;
            case 'teacher':
                Teacher::create([
                    'user_id' => $user->id
                ]);
                // Don't return from function; Create a Staff account for Teacher as well.
            case 'staff':
                Staff::create([
                    'user_id' => $user->id
                ]);
                return;
        }
    }
}
