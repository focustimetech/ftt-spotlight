<?php

namespace App\Http\Middleware;

use Closure;

class Scopes
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $roles)
    {
        $user = $request->user();
        foreach (explode(',', $roles) as $role) {
            if (!$user->hasRole($role)) {
                abort(403, "You don't have access to this data.");
            }
        }

        return $next($request);
    }
}
