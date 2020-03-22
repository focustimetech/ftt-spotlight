<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\SysAdmin;
use App\Http\Resources\SysAdmin as SysAdminResource;

class SysAdminController extends Controller
{
    public function create(Request $request)
    {
        $user = auth()->user();
        if (!$user->isSysAdmin()) {
            return response()->json([ 'message' => 'Only SysAdmins can create new SysAdmin accounts.' ], 403);
        } else {
            $sysadmin = SysAdmin::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'initials' => $request->input('initials'),
                'color' => 'black'
            ]);

            return new SysAdminResource($sysadmin);
        }
    }
}
