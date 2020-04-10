<?php

namespace App\Http\Controllers;

use App\Http\Resources\Avatar as AvatarResource;
use App\Http\Resources\User as UserResource;
use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function findAvatar($username)
    {
        $user = User::findByUsername($username);

        if (!$user) {
            return response()->json(['message' => 'User not found.'], 404);
        }

        return new AvatarResource($user);
    }

    public function currentUser(Request $request)
    {
        return new UserResource($request->user());
    }
}
