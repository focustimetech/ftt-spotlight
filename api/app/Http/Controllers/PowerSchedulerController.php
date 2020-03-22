<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Appointment;
use App\Amendment;
use App\BlockSchedule;
use App\PowerSchedule;
use App\Staff;
use App\Student;
use App\Http\Resources\PowerSchedule as PowerScheduleResource;

class PowerSchedulerController extends Controller
{
    public function schedule(Request $request)
    {
        $owner = auth()->user()->staff();
        $student_type = $request->input('student_type');
        $student_ids = $student_type === 'all'
            ? Student::all()->pluck('id')->toArray()
            : $request->input('student_ids');
        $staff_id = $request->input('staff_id');
        $schedule_type = $request->input('schedule_type');
        $memo = $request->input('memo');
        $time = strtotime($request->input('date_time'));

        $day_of_week = date('w', $time) + 1;
        $block_schedules = BlockSchedule::flexBlocks()->where('day_of_week', $day_of_week);
        $date = date('Y-m-d', $time);
        $power_schedule = PowerSchedule::create([
            'staff_id' => $owner->id,
            'type' => $schedule_type
        ]);
        $power_schedule_id = $power_schedule->id;

        $block_schedules->each(function($block_schedule) use($schedule_type, $student_type, $student_ids, $staff_id, $memo, $date, $power_schedule_id) {
            switch ($schedule_type) {
                case 'appointment':
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
                    break;
                case 'amendment':
                    if ($student_type === 'all') {
                        Amendment::create([
                            'student_id' => null,
                            'staff_id' => $staff_id,
                            'memo' => $memo,
                            'block_id' => $block_schedule->block()->first()->id,
                            'date' => $date,
                            'power_schedule_id' => $power_schedule_id
                        ]);
                    } else {
                        foreach ($student_ids as $student_id) {
                            Amendment::create([
                                'student_id' => $student_id,
                                'staff_id' => $staff_id,
                                'memo' => $memo,
                                'block_id' => $block_schedule->block()->first()->id,
                                'date' => $date,
                                'power_schedule_id' => $power_schedule_id
                            ]);
                        }
                    }    
                    break;
            }
        });

        return new PowerScheduleResource($power_schedule);
    }
}
