<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Staff;
use App\Oberservers\StaffObserver;

class EloquentEventServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        // Staff::observe(StaffObserver::class);
    }
}
