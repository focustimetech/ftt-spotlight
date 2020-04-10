<?php

use App\Classroom;
use App\Teacher;
use Illuminate\Database\Seeder;

class ClassroomsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $teachers = Teacher::all()->each(function(Teacher $teacher) {
            factory(Classroom::class)->create(['teacher_id' => $teacher->id])->each(function(Classroom $classroom) use($teacher) {
                $teacher->classrooms()->attach($classroom->id);
            });
        });
    }
}
