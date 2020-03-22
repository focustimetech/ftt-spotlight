<?php

use Faker\Generator as Faker;
use App\Staff;

$factory->define(App\Course::class, function (Faker $faker) {
    return [
        'owner' => $faker->randomElement(Staff::pluck('id')->toArray())
    ];
});
