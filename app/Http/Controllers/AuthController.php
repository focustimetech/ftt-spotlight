<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

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

    public function changePassword(Request $request)
    {
        $user = auth()->user();
        $new_password = $request->input('new_password');
        $verify_response = $this->verify($request);
        if ($verify_response->status() === 200) {
            $user->password = Hash::make($new_password);
            $user->password_expired = false;
            if ($user->save())
                return response()->json('Changed password successfully', 200);
            else {
                return response()->json('Cannot change password.', 500);
            }
        } else {
            return $verify_response;
        }
    }
}
