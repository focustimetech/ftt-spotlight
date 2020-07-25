<?php

namespace App\Http\Middleware;

use Closure;
use App\Traits\RefreshToken;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    use RefreshToken;

    const ACCESS_TOKEN = 'spotlight_access-token';
    const REFRESH_TOKEN = 'spotlight_refresh-token';

    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        if (! $request->expectsJson()) {
            return route('login');
        }
    }

    public function handle(Request $request, Closure $next, ...$guards)
    {
        if ($request->cookie(self::ACCESS_TOKEN)) {
            $request->headers->set('Authorization', 'Bearer ' . $request->cookie(self::ACCESS_TOKEN));
        }
        
        try {
            $this->authenticate($request, $guards);
        } catch (AuthenticationException $e) {
            $response = $this->refreshToken($request);
            if ($response->status() !== 200) {
                return $response;
            }

            $responseData = json_decode($response->getContent());
            return $next($request)
                ->withCookie(
                    self::ACCESS_TOKEN,
                    $responseData->access_token,
                    6000,                   // 100 minutes
                    null,                   // $path
                    null,                   // $domain
                    false,                  // $secure
                    true                    // $httpOnly
                )
                ->withCookie(
                    self::REFRESH_TOKEN,
                    $responseData->refresh_token,
                    664000,                 // 10 day expiry
                    null,                   // $path
                    null,                   // $domain
                    false,                  // $secure
                    true                    // $httpOnly
                );
        }

        return $next($request);
    }
}
