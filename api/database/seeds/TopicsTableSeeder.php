<?php

use App\Teacher;
use App\Topic;
use Illuminate\Database\Seeder;

class TopicsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $teachers = Teacher::all();

        foreach ($teachers as $teacher) {
            factory(Topic::class, 5)->create([
                'teacher_id' => $teacher->id
            ]);
        }
    }
}
