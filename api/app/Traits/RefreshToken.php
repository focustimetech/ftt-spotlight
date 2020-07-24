<?php

namespace App\Traits;

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

const REFRESH_TOKEN = 'spotlight_refresh-token';
const ACCESS_TOKEN = 'spotlight_access-token';

trait RefreshToken
{

    public function refreshToken(Request $request)
    {
        $http = new \GuzzleHttp\Client;
        $refreshToken = $request->cookie(REFRESH_TOKEN);
        
        try {
            $request->request->add([
                'grant_type' => 'refresh_token',
                'refresh_token' => $refreshToken,
                'client_id' => config('services.passport.client_id'),
                'client_secret' => config('services.passport.client_secret'),
                'scope' => ''
            ]);

            $refreshRequest = Request::create(
                config('services.passport.login_endpoint'),
                'post'
            );

            return Route::dispatch($refreshRequest);
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            if ($e->getCode() === 400) {
                return response()->json('Invalid Request. Refresh token is required.', $e->getCode());
            }

            return response()->json('Something went wrong on the server while trying to refresh token.', $e->getCode());
        }
    }
}
