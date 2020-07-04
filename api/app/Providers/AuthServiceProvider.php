<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Passport::routes(function ($router) {
            $router->forAccessTokens();
        });

        Passport::tokensExpireIn(now()->addMinutes(100));

        Passport::refreshTokensExpireIn(now()->addDays(10));

        // Register user permissions
        Passport::tokensCan([
            'student' => 'Student',
            'teacher' => 'Teacher',
            'admin' => 'Administrator',
            'sysadmin' => 'Systems Admin',
            'guardian' => 'Parent or Guardian'
        ]);

        Passport::cookie('spotlight_session');
    }
}
