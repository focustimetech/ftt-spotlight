<?php

use Faker\Generator as Faker;

$factory->define(App\SchedulePlan::class, function (Faker $faker) {
    return [
        'staff_id' => $faker->randomElement(App\Staff::pluck('id')->toArray())
    ];
});
