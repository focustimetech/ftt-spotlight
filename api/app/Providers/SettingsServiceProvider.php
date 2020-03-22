<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Setting;

class SettingsServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('settings', function($app) {
            return $app['cache']->remember('app.settings', 60, function() {
                return Setting::pluck('value', 'key')->toArray();
            });
        });
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
