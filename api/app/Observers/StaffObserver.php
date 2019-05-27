<?php

namespace App\Observers;

use App\Staff;
use App\User;

class StaffObserver
{
    public function saved(Staff $staff) {
        $user = new User;

        $user->account_type = 'staff';
        $user->username = $staff->email;
        $user->user_id = $staff->id;
        $user->password = bcrypt($staff->email);

        $user->save();
    }
}