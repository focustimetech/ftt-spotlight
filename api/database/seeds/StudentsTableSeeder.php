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
        $blocks = App\Block::where('flex', 0)->get();
        $staff_ids = App\Staff::pluck('id');
        // $faker =  Faker\Factory::create();

        factory(App\Student::class, 1)->create()->each(function ($student) use ($blocks, $staff_ids) {
            factory(App\User::class)->create([
                'user_id' => $student->id,
                'username' => $student->student_number,
                'account_type' => 'student',
                'password' => bcrypt($student->student_number)
            ]);
            
            $blocks->each(function($block) use ($student, $staff_ids) {
                $course = $block->courses()->get()->random(1)->first();
                echo "course: ". $course->name. ' - ID: '. $course->id;
                $course->enrollStudents($student, $staff_ids->random(1)->first());
            });

        });
    }
}
