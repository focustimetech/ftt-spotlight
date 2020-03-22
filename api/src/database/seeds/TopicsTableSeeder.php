<?php

use Illuminate\Database\Seeder;

class TopicsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $staff_list = App\Staff::all();

        $staff_list->each(function($staff) {
            factory(App\Topic::class, 4)->create([
                'staff_id' => $staff->id
            ]);
        });

        $time = time() === strtotime('sunday') ? strtotime('sunday -14 days') : strtotime('previous sunday -14 days');
        $end_time = strtotime('+28 days', $time);
        do {
            $day_of_week = date('w', $time) + 1;
            $blocks = App\BlockSchedule::all()->filter(function($block_schedule) use ($day_of_week) {
                return $block_schedule->day_of_week === $day_of_week
                && $block_schedule->block()->first()->flex == true;
            });
            $staff_list->each(function($staff) use ($blocks, $time) {
                $blocks->each(function($block) use ($time, $staff) {
                    $topic = $staff->getTopics()->random();
                    factory(App\TopicSchedule::class)->create([
                        'topic_id' => $topic->id,
                        'date' => date('Y-m-d', $time),
                        'block_id' => $block->block_id
                    ]);
                });
            });
            
            $time = strtotime('+1 day', $time);
        } while ($time <= $end_time);
    }
}
