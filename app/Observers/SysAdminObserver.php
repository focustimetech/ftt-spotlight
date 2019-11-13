<?php

namespace App\Observers;

use Illuminate\Support\Facades\Hash;
use App\SysAdmin;
use App\User;

class SysAdminObserver
{
    public function created(SysAdmin $sysadmin) {
        $user = new User;

        $user->account_type = 'sysadmin';
        $user->username = $sysadmin->email;
        $user->user_id = $sysadmin->id;
        $user->password = Hash::make($sysadmin->email);

        $user->save();
    }
}
