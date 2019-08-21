<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Appointment;
use App\Http\Resources\Appointment as AppointmentResource;

class AppointmentsController extends Controller
{
    public function find($id)
    {
        return Appointment::findOrFail($id);
    }

    public function create(Request $request)
    {
        $staff = auth()->user()->staff();

        $appointment = new Appointment;
        $appointment->staff_id = $staff->id;
        $appointment->student_id = $request->input('student_id');
        $appointment->date = date('Y-m-d', strtotime($request->input('date')));
        $appointment->block_id = $request->input('block_id');
        $appointment->memo = $request->input('memo');

        if ($appointment->save()) {
            return new AppointmentResource($appointment);
        }
    }

    public function delete($id)
    {
        $appointment = Appointment::findOrFail($id);

        if ($appointment->delete()) {
            return new AppointmentResource($appointment);
        }
    }
}
