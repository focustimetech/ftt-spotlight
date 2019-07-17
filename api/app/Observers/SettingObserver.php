<?php

namespace App\Observers;

class SettingObserver
{
    public function saved(Setting $setting)
    {
        Artisan::call('cache:clear');
    }
}
