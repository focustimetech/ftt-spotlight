<?php 

use Illuminate\Database\Seeder;

class LedgerTableSeeder extends Seeder
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
            $time = time() === strtotime('sunday') ? strtotime('sunday -14 days') : strtotime('previous sunday -14 days');
            // $course_ids = $student->courses()->pluck('id')->get();
            $block_time = $time;
            do {
                $day_number = date('w', $time) + 1; // Sun = 1, Sat = 7
                $block_schedules = App\BlockSchedule::all();                
                $block_schedules->each(function($block_schedule) {
                    $block = $student->blocks()->firstWhere('id', $block_schedule->id);
                    if (rand(1, 14) !== 1) { // 1 in 14 chance to miss a block
                        if ($block->flex == false) {
                            $staff_id = App\Course::find($block->pivot->course_id)->staff()->id;
                        } else {
                            $staff_id = App\Staff::pluck('id')->random(1)->first();
                        }
                        $block_time = $block->start;
                        factory(App\LedgerEntry::class)->create([
                            'date' => date('Y-m-d', $time),
                            'time' => $block_time,
                            'block_id' => $block->block_number,
                            'staff_id' => $staff_id,
                            'student_id' => $student_id
                        ]);
                    }
                });

                $time = strtotime('+1 day', $time); // next day
            } while (strtotime(date('Y-m-d', $time). ' '. $block_time) <= time());
        });
    }
}
