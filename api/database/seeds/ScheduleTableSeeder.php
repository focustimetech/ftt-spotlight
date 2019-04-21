<?php

use Illuminate\Database\Seeder;

class ScheduleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $courses = App\Course::all();
        $block_number_pool = App\Block::select('block_number')->groupBy('block_number')
            ->where('flex', 0)->get()->pluck('block_number')->toArray();
        $x = 0;

        foreach ($courses as $course) {
            factory(App\ScheduleEntry::class)->create([
                'course_id' => $course->id,
                'block_number' => $block_number_pool[$x ++ % (count($block_number_pool))]
            ]);
        }
    }
}
