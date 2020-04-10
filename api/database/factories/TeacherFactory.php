<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Teacher;
use Faker\Generator as Faker;

$factory->define(Teacher::class, function (Faker $faker) {
    $gender = $faker->randomElement(['male', 'female']);

    return [
        'first_name' => $faker->firstName($gender),
        'last_name' => $faker->lastName(),
        'title' => $faker->title($gender),
        'email' => $faker->unique()->safeEmail(),
        'administrator' => $faker->boolean()
    ];
});
