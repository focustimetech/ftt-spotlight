<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Setting;
use App\SettingsGroup;

class SettingsController extends Controller
{
    public function index()
    {
        return [
            'values' => $this->mapSettings(Setting::all()),
            'groups' => SettingsGroup::all()
        ];
    }

    private function mapSettings($settings)
    {
        return $settings->flatMap(function($setting) {
            return [$setting->key => $setting];
        });
    }

    public function getUnauthenticated()
    {
        return [
            'values' => $this->mapSettings(Setting::where('authenticated', false)->get()),
            'groups' => SettingsGroup::all()
        ];
    }
}
