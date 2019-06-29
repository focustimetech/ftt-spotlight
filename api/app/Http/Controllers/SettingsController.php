<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Setting;
use App\SettingsGroup;

class SettingsController extends Controller
{
    public function index()
    {
        return Setting::all()->groupBy('group_id')->map(function($item, $key) {
            $group = SettingsGroup::findOrFail($key);
            return [
                'name' => $group->name,
                'description' => $group->description,
                'settings' => $item
            ];
        })->values();
    }

    public function update(Request $request)
    {
        
    }
}
