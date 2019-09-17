<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Staff;
use App\Student;
use App\BlockSchedule;
use App\Appointment;
use App\PowerSchedule;

class PowerSchedulerController extends Controller
{
    public function schedule(Request $request)
    {
        $owner = auth()->user()->staff();
        $student_ids = $request->input('student_ids');
        $staff_id = $request->input('staff_id');
        $memo = $request->input('memo');
        $time = strtotime($request->input('date_time'));

        $day_of_week = date('w', $time) + 1;
        $block_schedules = BlockSchedule::flexBlocks()->where('day_of_week', $day_of_week);
        $date = date('Y-m-d', $time);
        $power_schedule = PowerSchedule::create([
            'staff_id' => $owner->id
        ]);
        $power_schedule_id = $power_schedule->id;

        $block_schedules->each(function($block_schedule) use($student_ids, $staff_id, $memo, $date, $power_schedule_id) {
            foreach ($student_ids as $student_id) {
                Appointment::create([
                    'student_id' => $student_id,
                    'staff_id' => $staff_id,
                    'memo' => $memo,
                    'block_id' => $block_schedule->block()->first()->id,
                    'date' => $date,
                    'power_schedule_id' => $power_schedule_id
                ]);
            }
        });
    }
}
