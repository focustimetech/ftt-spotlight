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
            'values' => Setting::all()->flatMap(function($setting) {
                return [$setting->key => $setting];
            }),
            'groups' => SettingsGroup::all()
        ];
    }

    public function update(Request $request)
    {
        
    }
}
