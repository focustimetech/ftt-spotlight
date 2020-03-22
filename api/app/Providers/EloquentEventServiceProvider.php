<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Staff;
use App\Observers\StaffObserver;
use App\Student;
use App\Observers\StudentsObserver;
use App\SysAdmin;
use App\Observers\SysAdminObserver;

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
        Staff::observe(StaffObserver::class);
        Student::observe(StudentsObserver::class);
        SysAdmin::observe(SysAdminObserver::class);
    }
}
