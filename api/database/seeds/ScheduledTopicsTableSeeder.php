<?php

use App\Block;
use App\ScheduledTopic;
use App\Teacher;
use Illuminate\Database\Seeder;

class ScheduledTopicsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $blocks = Block::all();
        $startOfWeek = strtotime('previous monday');

        /**
         * For each Teacher, randomly attach one of their topics to each Block of the week.
         */
        foreach(Teacher::all() as $teacher) {
            $topics = $teacher->topics()->get();
            if (count($topics) > 0) {
                foreach($blocks as $block) {
                    ScheduledTopic::create([
                        'block_id' => $block->id,
                        'topic_id' => $topics->random()->id,
                        'date' => date('Y-m-d', strtotime('+' . ($block->week_day + 6 ) % 7 . 'days', $startOfWeek))
                    ]);
                }
            }
        }
    }
}
