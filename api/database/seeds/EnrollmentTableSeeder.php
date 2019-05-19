<?php

use Illuminate\Database\Seeder;

class EnrollmentTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $students = App\Student::all();
        $block_numbers = App\Block::select('block_number')->groupBy('block_number')
            ->where('flex', 0)->get()->pluck('block_number')->toArray();

        $students->each(function($student) {
            foreach($block_numbers as $block_number) {
                
                factory(App\Enrollment::class)->create([
                    'student_id' => $student_id,
                    $course_id = Faker\Factory::create()->randomElement(App\ScheduleEntry::select('course_id')
                        ->where('block_number', $block_number)->get()->pluck('course_id')->toArray())
                ]);
            }
        });
        //@TODO Enroll all students into the focus Course we created.
    }
}
