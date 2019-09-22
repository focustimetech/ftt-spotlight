<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Staff;
use App\User;
use App\Http\Resources\Staff as StaffResource;
use App\Http\Resources\StaffProfile as StaffProfileResource;

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

        $staff_params = [
            'staff_type' => $request->input('staff_type'),
            'administrator' => $request->input('administrator'),
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'email' => $request->input('email')
        ];

        $result = $request->isMethod('put') ? $staff->update($staff_params) : $staff->create($staff_params);

        if ($result) {
            return new StaffResource($result);
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

    /**
     * Retreive a collection of data about the staff member
     */
    public function profile($id)
    {
        $staff = Staff::findOrFail($id);

        return new StaffProfileResource($staff);
    }

    public function setCapacity(Request $request)
    {
        $capacity = $request->input('capacity');
        $staff = auth()->user()->staff();
        $staff->setCapacity($capacity);
        return new StaffResource($staff);
    }
}
