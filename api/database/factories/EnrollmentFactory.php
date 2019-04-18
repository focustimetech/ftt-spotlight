<?php

use Faker\Generator as Faker;

$factory->define(App\Enrollment::class, function (Faker $faker) {
    return [
        'enrolled_by' => $faker->randomElement(App\Staff::pluck('id')->toArray()),
        'enrolled_at' => date('Y-m-d H:i:s', strtotime('previous monday -14 days')),
        'dropped_at' => NULL
    ];
});
