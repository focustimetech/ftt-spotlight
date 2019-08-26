<?php

use Faker\Generator as Faker;

$factory->define(App\Appointment::class, function (Faker $faker) {
    return [
        'memo' => $faker->sentence(rand(3, 8))
    ];
});
