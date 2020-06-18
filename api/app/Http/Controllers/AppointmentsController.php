<?php

namespace App\Http\Controllers;

use App\Appointment;
use App\Http\Resources\Appointment as AppointmentResource;
use Illuminate\Http\Request;

class AppointmentsController extends Controller
{
    public function list(Request $request)
    {
        $teacher = auth()->user()->account();
        $appointments = $teacher->appointments()->get();

        return AppointmentResource::collection($appointments);
    }

    public function create(Request $request)
    {
        $teacher = auth()->user()->account();
    }
}
