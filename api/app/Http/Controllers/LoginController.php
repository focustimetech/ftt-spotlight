<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Resources\User as UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

class LoginController extends Controller
{
    const REFRESH_TOKEN = 'spotlight_refresh-token';
    const ACCESS_TOKEN = 'spotlight_access-token';

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string'
        ]);
/*
        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials.'], 401);
        }

        $accessToken = Auth::user()->createToken('auth-token');

        return $accessToken;
*/

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

            $request->request->add([
                'grant_type' => 'password',
                'client_id' => config('services.passport.client_id'),
                'client_secret' => config('services.passport.client_secret'),
                'username' => $request->username,
                'password' => $request->password,
                'scope' => $user->account_type
            ]);

            $tokenRequest = Request::create(
                config('services.passport.login_endpoint'),
                'post'
            );

            $response = Route::dispatch($tokenRequest);
            if ($response->status() === 200) {
                //if ($user->isDisabled()) return response()->json('Account disabled.', 423);
            }

            $responseData = json_decode($response->getContent());

            return (new UserResource($user))
                ->response()
                ->cookie(
                    self::ACCESS_TOKEN,
                    $responseData->access_token,
                    600,                    // 10 minutes
                    null,                   // $path
                    null,                   // $domain
                    false,                  // $secure
                    true                    // $httpOnly
                )
                ->cookie(
                    self::REFRESH_TOKEN,
                    $responseData->refresh_token,
                    664000,                 // 10 day expiry
                    null,                   // $path
                    null,                   // $domain
                    false,                  // $secure
                    true                    // $httpOnly
                );
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            if ($e->getCode() === 400) {
                return response()->json('Invalid Request. Username and password are required.', $e->getCode());
            } else if ($e->getCode() === 401) {
                return response()->json('Credentials are incorrect. Please try again.', $e->getCode());
            }

            return response()->json('Something went wrong on the server while trying to authenticate.', $e->getCode());
        }
    }

    /*
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
            return response()->json(['message' => 'Verified user successfully'], 200);
        } else {
            return $response;
        }
    }
    */
}
