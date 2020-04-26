<?php

namespace App\Observers;

use Hash; // Alias exists for Hash facade
use Utils;
use App\User;

class UserObserver
{
    public function creating(User $user) {
        
        if ($user->password == null) {
            $user->password = Hash::make($user->username);
        }
        if ($user->color == null) {
            $user->color = Utils::randomColor();
        }
        if ($user->initials == null) {
            $user->initials = strtoupper($user->first_name[0] . $user->last_name[0]);
        }
        // return $user->save();
    }
}
