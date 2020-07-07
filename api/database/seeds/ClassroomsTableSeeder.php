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
        factory(Classroom::class, count(Teacher::all()))->create();
    }
}
