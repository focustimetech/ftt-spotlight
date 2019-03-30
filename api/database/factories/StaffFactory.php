<?php

use Faker\Generator as Faker;

$factory->define(App\Staff::class, function (Faker $faker) {
    $gender = $faker->randomElement(array("male", "female"));
    return [
        'staff_type' => $faker->randomElement(array('teacher', 'administrator')),
        'administrator' => $faker->randomElement(array(true, false)),
        'title' => $faker->title($gender),
        'first_name' => $faker->firstName($gender),
        'last_name' => $faker->lastName($gender),
        'email' => $faker->email(),
        'password' => bcrypt('password')
    ];
});
