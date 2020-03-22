<?php

namespace App\Observers;

use Illuminate\Support\Facades\Hash;
use App\Staff;
use App\User;

class StaffObserver
{
    public function created(Staff $staff) {
        $user = new User;

        $user->account_type = 'staff';
        $user->username = $staff->email;
        $user->user_id = $staff->id;
        $user->password = Hash::make($staff->email);

        $user->save();
    }
}