<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\User;
use App\Http\Resources\User as UserResource;
use App\Http\Resources\Username as UsernameResource;
use App\Http\Traits\Authenticate;
use App\Exceptions\UserNotFoundException;

class AuthController extends Controller
{
    use Authenticate;

    public function user()
    {
        return new UserResource(auth()->user());
    }

    public function getUsername(Request $request)
    {
        $username = $request->input('username');
        try {
            $user = User::findByUsername($username);
            return new UsernameResource($user);
        } catch (UserNotFoundException $e) {
            return response()->json('User does not exist.', 404);
        }
    }

    public function logout() {
        auth()->user()->tokens->each(function ($token, $key) {
            $token->delete();
        });

        return response()->json('Logged out successfully.', 200);
    }

    public function changePassword(Request $request)
    {
        $user = auth()->user();
        $new_password = $request->input('new_password');
        $verify_response = $this->verify($request);
        if ($verify_response->status() === 200) {
            $user->password = Hash::make($new_password);
            $user->password_expired = false;
            if ($user->reenable) {
                $user->reenable();
                $user->reenable = false;
            }
            if ($user->save())
                return response()->json('Changed password successfully', 200);
            else {
                return response()->json('Cannot change password.', 500);
            }
        } else {
            return $verify_response;
        }
    }

    public function resetPassword($user_id)
    {
        $user =  User::find($user_id);
        
        $user->password = Hash::make($user->username);
        $user->password_expired = true;
        $user->disabled_at = date('Y-m-d H:i:s', strtotime('+60 minutes'));
        $user->reenable = true;
        $user->save();

        return response()->json('Reset user\'s passwords successfully.', 200);
    }
}
