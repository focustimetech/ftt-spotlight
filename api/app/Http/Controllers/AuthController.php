<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\User as UserResource;
use App\Http\Traits\Authenticate;

class AuthController extends Controller
{
    use Authenticate;

    public function user()
    {
        return new UserResource(auth()->user());
    }

    public function logout() {
        auth()->user()->tokens->each(function ($token, $key) {
            $token->delete();
        });

        return response()->json('Logged out successfully', 200);
    }
}
