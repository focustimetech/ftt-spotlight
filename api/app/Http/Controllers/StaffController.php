<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Staff;
use App\User;
use App\Http\Resources\Staff as StaffResource;

class StaffController extends Controller
{
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Get all staff members
        $staff = Staff::all();

        return StaffResource::collection($staff);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $staff = $request->isMethod('put') ? Staff::findOrFail($request->staff_id) : new Staff;
        $user = $request->isMethod('put') ? User::where('user_id', $request->staff_id) : new User;

        $staff->staff_type = $request->input('staff_type');
        $staff->administrator = $request->input('administrator');
        $staff->first_name = $request->input('first_name');
        $staff->last_name = $request->input('last_name');
        $staff->email = $request->input('email');

        if ($staff->save()) {
            $user->account_type = 'staff';
            $user->username = $request->input('email');
            $user->user_id = $staff->id;

            if ($request->isMethod('post')) {
                $user->password = bcrypt($request->input('email'));
            }

            if ($user->save()) {
                return new StaffResource($staff);
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $staff = Staff::findOrFail($id);
        // Return staff as resource
        return new StaffResource($staff);
    }

    public function destroy($id)
    {
        $staff = Staff::findOrFail($id);
    
        if ($staff->delete()) {
            return new StaffResource($staff);
        }
    }
}
