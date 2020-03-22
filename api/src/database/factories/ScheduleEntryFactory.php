<?php

use Faker\Generator as Faker;

$factory->define(App\ScheduleEntry::class, function (Faker $faker) {
    return [
        'staff_id' => $faker->randomElement(App\Staff::pluck('id')->toArray())
    ];
});
