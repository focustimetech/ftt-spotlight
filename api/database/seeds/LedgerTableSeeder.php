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
        $student_ids = App\Student::pluck('id')->toArray();

        foreach ($student_ids as $student_id) {
            $time = time() === strtotime('sunday') ? strtotime('sunday -14 days') : strtotime('previous sunday -14 days');
            $course_ids = App\Enrollment::where('student_id', $student_id)
                    ->get()->pluck('course_id')->toArray();
            $block_time = $time;
            do {
                $day_number = date('w', $time) + 1; // Sun = 1, Sat = 7
                $blocks = App\Block::select('block_number', 'flex', 'start')
                    ->where('day_of_week', $day_number)->get();

                foreach ($blocks as $block) {
                    if (rand(1, 14) !== 1) { // 1 in 14 chance to miss a block
                        if ($block->flex == false) {
                            $staff_id = App\ScheduleEntry::whereIn('course_id', $course_ids)
                                ->where('block_number', $block->block_number)->pluck('staff_id')->first();
                        } else {
                            $staff_id = Faker\Factory::create()->randomElement(App\Staff::pluck('id')->toArray());
                        }
                        $block_time = $block->start;
                        factory(App\LedgerEntry::class)->create([
                            'date' => date('Y-m-d', $time),
                            'time' => $block_time,
                            'block_number' => $block->block_number,
                            'staff_id' => $staff_id,
                            'student_id' => $student_id
                        ]);
                    }
                }
                $time = strtotime('+1 day', $time); // next day
            } while (strtotime(date('Y-m-d', $time). ' '. $block_time) <= time());
        }
    }
}
