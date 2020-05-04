<?php

use Illuminate\Database\Seeder;

class BlocksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $time = strtotime('monday 9am');
        $beginsOn = $time;
        for ($dayOfWeek = 1; $dayOfWeek <= 7; $dayOfWeek ++) {
            $time = strtotime('9am', $time);
            for ($i = 0; $i < 4; $i ++) {
                factory(Block::class)->create([
                    'start_time' => date('H:i:s', $time),
                    'end_time' => date('+50 minutes', $time),
                    'begins_on' => $beginsOn,
                    'ends_on' => null,
                    'week_day', $dayOfWeek
                ]);
                $time = strtotime('+1 hour', $time);
            }
            $time = strtotime('+1 day', $time);
        }
    }
}
