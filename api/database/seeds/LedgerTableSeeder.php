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

        $students->each(function($student, $index) {
            $time = time() === strtotime('sunday') ? strtotime('sunday -14 days') : strtotime('previous sunday -14 days');
            $block_time = $time;
            do {
                $day_number = date('w', $time) + 1; // Sun = 1, Sat = 7
                $blocks = $student->blocks();
                $blocks->each(function($block) use (&$block_time, $day_number, $student, $time) {
                    if ($block->flex == false) {
                        $staff_id = App\Course::find($block->pivot->course_id)->staff()->id;
                    } else {
                        $staff_id = App\Staff::pluck('id')->random(1)->first();
                    }
                    $schedule_blocks = $block->schedule()->where('day_of_week', $day_number)->get();
                    $schedule_blocks->each(function($schedule_block) use ($block, &$block_time, $staff_id, $student, $time) {
                        if (rand(1, 14) !== 1) { // 1 in 14 chance of missing the block
                            $block_time = $schedule_block->start;
                            factory(App\LedgerEntry::class)->create([
                                'date' => date('Y-m-d', $time),
                                'time' => $block_time,
                                'block_id' => $block->id,
                                'staff_id' => $staff_id,
                                'student_id' => $student->id
                            ]);
                        }
                    });
                });
                $time = strtotime('+1 day', $time); // next day
                // echo "\$block_time: $block_time \n";
                // echo "time(): ".date('Y-m-d', time()). "\n\n";
            } while (strtotime(date('Y-m-d', $time). ' '. $block_time) <= time());
        });
    }
}
