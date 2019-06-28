<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Setting;

class SettingsController extends Controller
{
    public function index()
    {
        return Setting::all()->groupBy('group')->map(function($item, $key) {
            return [
                'name' => $key,
                'settings' => $item
            ];
        })->values();
    }

    public function update(Request $request)
    {
        
    }
}
