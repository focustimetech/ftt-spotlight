<?php

use Illuminate\Database\Seeder;

class SchedulePlansTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $students = App\Student::all();
        $end_time = time() === strtotime('sunday') ? strtotime('sunday +14 days') : strtotime('previous sunday +14 days');

        $students->each(function($student) {
            $time = time() === strtotime('sunday') ? strtotime('sunday -14 days') : strtotime('previous sunday -14 days');
            $block_time = $time;
            do {
                $day_number = date('w', $time) + 1; // Sun = 1, Sat = 7
                $blocks = App\Block::flexBlocks();
                $blocks->each(function($block) use (&$block_time, $day_number, $student, $time) {
                    $schedule_blocks = $block->schedule()->where('day_of_week', $day_number)->get();
                    $schedule_blocks->each(function($schedule_block) use ($block, &$block_time, $day_number, $student, $time) {
                        $block_time = $schedule_block->start;
                        $staff_id = App\Staff::all()->get()->random(1)->first()->id;
                        if (rand(1, 2) === 1) { // 50% chance to misalign plan/log
                            $ledger_entry = App\LedgerEntry::where('day_of_week', $day_number)
                                ->where('student_id', $student->id)
                                ->where('block_id', $block->id)
                                ->get()->first();
                            if ($ledger_entry) {
                                $staff_id = $ledger_entry->staff_id;
                            }
                        }
                        factory(App\LedgerEntry::class)->create([
                            'date' => date('Y-m-d', $time),
                            'time' => $block_time,
                            'block_id' => $block->id,
                            'staff_id' => $staff_id,
                            'student_id' => $student->id
                        ]);
                    });
                });
                $time = strtotime('+1 day', $time); // next day
            } while (strtotime(date('Y-m-d', $time). ' '. $block_time) <= time());
        });
    }
}
