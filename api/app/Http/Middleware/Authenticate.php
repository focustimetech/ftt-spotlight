<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    const ACCESS_TOKEN = 'spotlight_access-token';

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

        $this->authenticate($request, $guards);

        return $next($request);
    }
}
