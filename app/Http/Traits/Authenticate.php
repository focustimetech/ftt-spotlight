<?php

namespace App\Http\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\User;
use App\Exceptions\UserNotFoundException;

trait Authenticate
{
    public function login(Request $request)
    {
        $http = new \GuzzleHttp\Client;

        try {
            try {
                $user = User::findByUsername($request->username);
            } catch (UserNotFoundException $e) {
                return response()->json([
                    'type' => 'username',
                    'message' => 'The user could not be found. Please check with your administrator.'
                ], 404);
            }

            $user_role = $user->getRole();
            $request->request->add([
                'grant_type' => 'password',
                'client_id' => config('services.passport.client_id'),
                'client_secret' => config('services.passport.client_secret'),
                'username' => $request->username,
                'password' => $request->password,
                'scope' => $user_role
            ]);

            $tokenRequest = Request::create(
                config('services.passport.login_endpoint'),
                'post'
            );

            $response = Route::dispatch($tokenRequest);
            if ($response->status() === 200) {
                // Check disabled only if password is successful
                if ($user->isDisabled())
                    return response()->json('Account disabled.', 423);
            }

            return $response;
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            if ($e->getCode() === 400) {
                return response()->json('Invalid Request. Username and password are required.', $e->getCode());
            } else if ($e->getCode() === 401) {
                return response()->json('Credentials are incorrect. Please try again.', $e->getCode());
            }

            return response()->json('Something went wrong on the server while trying to authenticate.', $e->getCode());
        }
    }

    public function verify(Request $request)
    {
        $username = auth()->user()->username;
        $password = $request->password;
        $request->replace([
            'username' => $username,
            'password' => $password
        ]);

        $response = $this->login($request);
        if ($response->status() === 200) {
            return response()->json('Verified user successfully', 200);
        } else {
            return $response;
        }
    }

    public function enforcePasswordPolicy()
    {
        $users = User::all();
        $total = $users->count();
        echo "Flagging users with default passwords ($total total) ...\n";
        $flagged = 0;
        $users->each(function($user) use (&$flagged) {
            if (Hash::check($user->username, $user->password)) {
                $user->password_expired = true;
                $user->save();
                $flagged ++;
            }
        });

        echo "Flagged $flagged out of $total users.\n";
    }
}
