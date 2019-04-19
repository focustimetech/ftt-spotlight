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
        $student_ids = App\Student::pluck('id')->toArray();

        foreach ($student_ids as $student_id) {
            $ledger_entries = App\LedgerEntry::where('student_id', $student_id)->get();
            $indexes = [];
            for ($x = rand(0, 5); $x > 0; $x --) {
                $index = rand(0, count($ledger_entries));
                if (!in_array($index, $indexes)) {
                    array_push($indexes, $index);
                }
            }
            foreach($indexes as $index) {
                factory(App\Appointment::class)->create([
                    'student_id' => $student_id,
                    'staff_id' => $ledger_entries[$index]->staff_id,
                    'block_number' => $ledger_entries[$index]->block_number,
                    'date' => $ledger_entries[$index]->date
                ]);
            }
        }
    }
}
