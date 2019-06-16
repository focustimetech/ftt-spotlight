<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Resources\User as UserResource;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $http = new \GuzzleHttp\Client;

        try {
            $request->request->add([
                'grant_type' => 'password',
                'client_id' => config('services.passport.client_id'),
                'client_secret' => config('services.passport.client_secret'),
                'username' => $request->username,
                'password' => $request->password,
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
