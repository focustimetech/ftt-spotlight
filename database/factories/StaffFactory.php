<?php

use Faker\Generator as Faker;

use App\Http\Utils;

$factory->define(App\Staff::class, function (Faker $faker) {
    $gender = $faker->randomElement(array("male", "female"));
    $first_name = $faker->firstName($gender);
    $last_name = $faker->lastName($gender);
    $initials = substr($first_name, 0, 1). substr($last_name, 0, 1);
    return [
        'staff_type' => $faker->randomElement(array('teacher', 'administrator')),
        'administrator' => $faker->randomElement(array(true, false)),
        'title' => $faker->title($gender),
        'first_name' => $first_name,
        'last_name' => $last_name,
        'initials' => $initials,
        'email' => $faker->email(),
        'color' => Utils::userColor()
    ];
});
