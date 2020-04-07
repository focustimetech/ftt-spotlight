<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Student;
use Faker\Generator as Faker;

$factory->define(Student::class, function (Faker $faker) {
    return [
        'first_name' => $faker->firstName(),
        'last_name' => $faker->lastName(),
        'student_number' => $faker->unique()->numberBetween(100000, 999999),
        'grade' => $faker->numberBetween(9, 12)
    ];
});
