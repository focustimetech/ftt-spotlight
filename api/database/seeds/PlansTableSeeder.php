<?php

use App\Block;
use App\Plan;
use App\Student;
use App\Teacher;
use Illuminate\Database\Seeder;

class PlansTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $blocks = Block::all();
        $teachers = Teacher::all();
        $startOfWeek = strtotime('monday');

        /**
         * For each Student, randomly select a Teacher for each Block of the week
         */
        foreach(Student::all() as $student) {
            foreach($blocks as $block) {
                Plan::create([
                    'student_id' => $student->id,
                    'block_id' => $block->id,
                    'teacher_id' => $teachers->random()->id,
                    'date' => date('Y-m-d', strtotime('+' . ($block->day_of_week + 5 ) % 7 . 'days', $startOfWeek))
                ]);
            }
        }
    }
}
