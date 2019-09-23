<?php

namespace App\Http\Middleware;

use Closure;

class ExpiredPassword
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = $request->user();
        if ($user->passwordExpired())
            abort(403, 'Your password has expired. Please change your password and try again.');
        return $next($request);
    }
}
