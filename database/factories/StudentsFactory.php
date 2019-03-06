<?php

use Faker\Generator as Faker;

$factory->define(App\Student::class, function (Faker $faker) {
    $first_name = $faker->firstName();
    $last_name = $faker->lastName();
    $initials = substr($first_name, 0, 1). substr($last_name, 0, 1);
    return [
        'student_number' => $faker->numberBetween(10000, 999999),
        'first_name' => $first_name,
        'last_name' => $last_name,
        'initials' => $initials,
        'grade' => $faker->numberBetween(9, 12),
        'homeroom' => $faker->numberBetween(1, 45),
        // 'team' => null,
        'password' => bcrypt($faker->password()),
        'disabled' => false
    ];
});
