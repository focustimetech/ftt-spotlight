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

        factory(App\Student::class, 1000)->create()->each(function ($student) {
            factory(App\User::class)->create([
                'user_id' => $student->id,
                'username' => $student->student_number,
                'account_type' => 'student',
                'password' => bcrypt($student->student_number)
            ]);
        });
    }
}
