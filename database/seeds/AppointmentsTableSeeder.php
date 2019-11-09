<?php

use Illuminate\Database\Seeder;

class AppointmentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $students = App\Student::all();
        $students->each(function($student) {
            // Create appointments on ledger entries
            $ledger_entries = $student->ledgerEntries()->get()->random(rand(0, 5));
            $ledger_entries->each(function($ledger_entry) use ($student) {
                factory(App\Appointment::class)->create([
                    'student_id' => $student->id,
                    'staff_id' => $ledger_entry->staff_id,
                    'block_id' => $ledger_entry->block_id,
                    'date' => date('Y-m-d', strtotime($ledger_entry->date))
                ]);
            });

            // Create future appointments
            $plans = $student->plans()->get()->random(rand(0, 3));
            $plans->each(function($plan) use ($student) {
                factory(App\Appointment::class)->create([
                    'student_id' => $student->id,
                    'staff_id' => $plan->staff_id,
                    'block_id' => $plan->block_id,
                    'date' => $plan->date
                ]);
            });
        });
    }
}
