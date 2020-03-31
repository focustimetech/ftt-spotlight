<?php

namespace App\Http\Controllers;

use App\Http\Resources\Avatar as AvatarResource;
use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function avatar(Request $request) {
        $username = $request->username;
        $user = User::findByUsername($username);

        if (!$user) {
            return response()->json(['message' => 'User not found.'], 404);
        }
        
        return new AvatarResource($user);
    }
}
