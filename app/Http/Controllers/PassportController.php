<?php

namespace App\Http\Controllers;

use App\Staff;
use Illuminate\Http\Request;

class PassportController extends Controller
{
    
    public function register(Request $request) {
        $staff = new Staff;

        $staff->id = $request->input('staff_id');
        $staff->account_type = $request->input('account_type');
        $staff->administrator = $request->input('administrator');
        $staff->first_name = $request->input('first_name');
        $staff->last_name = $request->input('last_name');
        $staff->email = $request->input('email');
        $staff->password = bcrypt($request->input('password'));

        $token = $staff->createToken('TutsForWeb')->accessToken;

        return response()->json(['token' => $token], 200);
    }

    public function login(Request $request) {
        $credentials = [
            'email' => $request->email,
            'password' => $request->password
        ];

        if (auth()->attempt($credentials)) {
            $token = auth()->staff()->createToken('TutsForWeb')->accessToken;
            return response()->json(['token' => $token], 200);
        }
        else {
            return response()->json(['error' => 'Unauthorized!'], 401);
        }
    }

    public function details() {
        return response()->json(['staff' => auth()->user()], 200);
    }
}
