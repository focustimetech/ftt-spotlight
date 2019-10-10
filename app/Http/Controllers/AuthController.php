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

    public function resetPasswords(Request $request)
    {
        $acting_user_id = auth()->user()->id;
        $user_ids = $request->input('user_ids');
        foreach ($user_ids as $user_id) {
            $user = User::find($user_id);
            if ($user && $user_id !== $acting_user_id)
                $user->resetPassword();
        }

        return response()->json("Reset users' passwords successfully.", 200);
    }

    public function disableAccounts(Request $request)
    {
        $acting_user_id = auth()->user()->id;
        $user_ids = $request->input('user_ids');
        foreach ($user_ids as $user_id) {
            $user = User::find($user_id);
            if ($user && $user_id !== $acting_user_id)
                $user->disable();
        }

        return response()->json('Disabled users successfully.', 200);
    }

    public function reenableAccounts(Request $request)
    {
        $acting_user_id = auth()->user()->id;
        $user_ids = $request->input('user_ids');
        foreach ($user_ids as $user_id) {
            $user = User::find($user_id);
            if ($user && $user_id !== $acting_user_id)
                $user->reenable();
        }

        return response()->json('Reenabled users successfully.', 200);
    }

    public function invalidatePasswords(Request $request)
    {
        $acting_user_id = auth()->user()->id;
        $user_ids = $request->input('user_ids');
        foreach ($user_ids as $user_id) {
            $user = User::find($user_id);
            if ($user && $user_id !== $acting_user_id)
                $user->invalidatePassword();
        }

        return response()->json("Invalidated users' passwords successfully.", 200);
    }
}
