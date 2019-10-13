<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Appointment;
use App\Student;
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
        $student = Student::findOrFail($request->input('student_id'));
        $date = date('Y-m-d', strtotime($request->input('date')));
        $block_id = $request->input('block_id');
        $appointments = $student->appointments()
            ->where('date', $date)
            ->where('block_id', $block_id)
            ->get();
        $appointment_limit = app('settings')['appointment_limit'];
        if ($appointment_limit > 0 && count($appointments) >= $appointment_limit)
            return response()->json([ 'message' => 'The maximum number of appointments has been reached.' ], 409);

        $appointment = Appointment::create([
            'staff_id' => $staff->id,
            'student_id' => $student->id,
            'date' => $date,
            'block_id' => $block_id,
            'memo' => $request->input('memo')
        ]);

        return new AppointmentResource($appointment);
    }

    public function delete($id)
    {
        $appointment = Appointment::findOrFail($id);
        $staff = auth()->user()->staff();
        if ($appointment->staff_id === $staff->id || $staff->administrator == true) {
            if ($appointment->delete()) {
                return new AppointmentResource($appointment);
            }
        } else
            abort(403, 'Cannot delete Appointment.');
    }
}
