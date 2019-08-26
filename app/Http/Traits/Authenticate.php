<?php

namespace App\Http\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\User;

trait Authenticate
{
    public function login(Request $request)
    {
        $http = new \GuzzleHttp\Client;

        try {
            $user = User::findByUsername($request->username);
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
            return response()->json('Verified user successfully');
        } else {
            return $response;
        }
    }
}
