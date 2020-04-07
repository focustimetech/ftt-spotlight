<?php

use App\Guardian;
use App\Student;
use Illuminate\Database\Seeder;

class GuardiansTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Guardian::class, 10)->create()->each(function(Guardian $guardian) {
            $guardian->students()->attach(Student::all()->random()->id);
        });
    }
}
