<?php

use Illuminate\Database\Seeder;

class StudentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        factory(App\Student::class, 30)->create()->each(function($student) {
            $block_number_pool = App\Block::select('block_number')->groupBy('block_number')
            ->where('flex', 0)->get()->pluck('block_number')->toArray();

            foreach($block_number_pool as $block_number) {
                factory(App\Enrollment::class)->create([
                    'student_id' => $student->id,
                    'course_id' => Faker\Factory::create()->randomElement(App\ScheduleEntry::select('course_id')
                        ->where('block_number', $block_number)->get()->pluck('course_id')->toArray())
                ]);
            }
        });
    }
}
