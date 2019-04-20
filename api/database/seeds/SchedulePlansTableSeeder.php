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
        $blocks = App\Block::where('flex', 1)->get();
        $student_ids = App\Student::pluck('id')->toArray();
        foreach($student_ids as $student_id) {
            foreach ($blocks as $block) {
                $plan = [
                    'student_id' => $ledger_entry->student_id,
                    'date' => $ledger_entry->date,
                    'block_number' => $block->block_number
                ];
                if (rand(1, 2) === 1) { // 50% chance consistent log w/ plan
                    $plan['staff_id'] = $ledger_entry->staff_id;
                }
                factory(App\SchedulePlan::class)->create($plan);
            }
        }
    }
}
