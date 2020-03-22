<?php

use Illuminate\Database\Seeder;

class CoursesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $courses = [
            [
                'name' => 'Science',
                'short_name' => 'SCI'
            ],
            [
                'name' => 'English',
                'short_name' => 'ENG'
            ],
            [
                'name' => 'Social Studies',
                'short_name' => 'SOC'
            ],
            [
                'name' => 'Math',
                'short_name' => 'MAT'
            ],
            [
                'name' => 'Arts',
                'short_name' => 'ART'
            ],
            [
                'name' => 'Info Tech',
                'short_name' => 'IT'
            ]
        ];

        foreach ($courses as $course) {
            for ($level = 9; $level <= 12; $level ++) {
                factory(App\Course::class)->create([
                    'name' => $course['name']. " $level",
                    'short_name' => $course['short_name']. $level
                ]);
            }
        }

        $block_ids = App\Block::where('flex', 0)->pluck('id')->toArray();
        $courses = App\Course::all();
        $staff_ids = App\Staff::pluck('id')->toArray();
        $faker =  Faker\Factory::create();

        $index = 0;
        $courses->each(function($course, $key) use($index, $block_ids, $staff_ids, $faker) {
            // global $index, $block_ids;
            $block_id = $block_ids[$key ++ % count($block_ids)];
            $pivot = ['staff_id' =>$faker->randomElement($staff_ids)];
            $course->blocks()->attach($block_id, $pivot);
        });

    }
}
