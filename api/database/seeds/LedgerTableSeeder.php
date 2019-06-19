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
            $block_time = date('H:i:s', $time);
            do {
                $day_number = date('w', $time) + 1; // Sun = 1, Sat = 7
                $blocks = $student->getBlocks();
                $blocks->each(function($block) use (&$block_time, $day_number, $student, $time) {
                    if ($block->flex == false) {
                        $staff = App\Course::find($block->pivot->course_id)->staff();
                    } else {
                        $staff = App\Staff::all()->random();
                    }
                    $schedule_blocks = $block->schedule()->where('day_of_week', $day_number)->get();
                    $schedule_blocks->each(function($schedule_block) use ($block, &$block_time, $staff, $student, $time) {
                        if (rand(1, 14) !== 1) { // 1 in 14 chance of missing the block
                            $block_time = $schedule_block->start;
                            $date = date('Y-m-d', $time);
                            $params = [
                                'date' => $date,
                                'time' => $block_time,
                                'block_id' => $block->id,
                                'staff_id' => $staff->id,
                                'student_id' => $student->id,
                            ];
                            if ($block->flex) {
                                $topic_ids = $staff->getTopics()->pluck('id')->toArray();
                                $topic_schedule = App\TopicSchedule::whereIn('topic_id', $topic_ids)->where('date', $date)->where('block_schedule_id', $schedule_block->id)->first();
                                // dd("\$schedule_block_id: $schedule_block_id");
                                $params['topic_id'] = $topic_schedule->topic_id;
                                // dd($topic_schedule);
                            }
                            // dd("\$staff->id: $staff->id \n \$date: $date \n \$topic_ids[0]: $topic_ids[0] \n \$schedule_block->id: $schedule_block->id \n \$topic_schedule: $topic_schedule \n");
                            // die;
                            factory(App\LedgerEntry::class)->create($params);
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
