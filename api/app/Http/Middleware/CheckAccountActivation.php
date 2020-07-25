<?php

namespace App\Http\Middleware;

use Closure;

class CheckAccountActivation
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
        $user = $request->auth()->user();
        if (!$user->active) {
            abort(403, "Your account hasn't been activated yet.");
        }

        return $next($request);
    }
}
