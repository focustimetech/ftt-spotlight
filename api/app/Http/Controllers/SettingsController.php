<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Setting;

class SettingsController extends Controller
{
    public function index()
    {
        return Setting::all();
    }

    public function update(Request $request)
    {
        
    }
}
