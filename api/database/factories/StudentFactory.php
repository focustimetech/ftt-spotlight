<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Student;
use App\User;
use Faker\Generator as Faker;

$factory->define(Student::class, function (Faker $faker) {
    $studentNumber = $faker->unique()->numberBetween(100000, 999999);
    $user = factory(User::class)->create([
        'account_type' => 'student',
        'username' => $studentNumber
    ]);

    return [
        'user_id' => $user->id,
        'grade' => $faker->numberBetween(9, 12),
        'student_number' => $studentNumber
    ];
});
