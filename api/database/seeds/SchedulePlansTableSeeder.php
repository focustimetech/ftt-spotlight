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
        $ledger_entries = App\LedgerEntry::select('student_id', 'staff_id')
            ->where('flex', 1)->get();
        foreach ($ledger_entries as $ledger_entry) {
            $plan = [
                'student_id' => $ledger_entry->student_id,
                'date' => $ledger_entry->date,
                'block_number' => $ledger_entry->block_number
            ];
            if (rand(1, 2) === 1) { // 50% chance consistent log w/ plan
                $plan['staff_id'] = $ledger_entry->staff_id;
            }
            factory(App\SchedulePlan::class)->create($plan);
        }
    }
}
