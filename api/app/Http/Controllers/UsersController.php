<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Staff;
use App\Http\Resources\User as UserResource;

class UsersController extends Controller
{
    public function getAllUsers()
    {
        $users = User::all();
        return UserResource::collection($users);
    }

    public function getAllAdministrators()
    {
        return Staff::administrators()->map((function ($staff) {
            return $staff->user();
        }));
    }
}
