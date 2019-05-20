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

        $block_ids = App\Block::pluck('id')->toArray();
        $index = 0;

        foreach ($courses as $course) {
            for ($level = 9; $level <= 12; $level ++) {
                factory(App\Course::class)->create([
                    'name' => $course['name']. " $level",
                    'short_name' => $course['short_name']. $level
                ]);
            }
        }

        /*
        $courses = App\Course::all();
        $courses->each(function($course) {
            global $index, $block_ids;
            $course->blocks()->attach($block_ids[$index ++ % count($block_ids)]);
        });
        */
    }
}
