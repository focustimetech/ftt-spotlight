<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class LoginController extends Controller
{
    public function login(Request $request) {
        $credentials = $request->validate([
            'username' => 'required',
            'password' => 'required'
        ]);

        if (Auth::attempt($credentials)) {
            return response()->json(['message' => 'Signed in successfully.'], 200);
        }

        return response()->json(['message' => 'The given credentials were not correct.'], 404);
    }

    public function logout(Request $request) {
        Session::flush();
        Auth::logout();

        return response()->json(['message' => 'Signed out successfully.'], 200);
    }
}
