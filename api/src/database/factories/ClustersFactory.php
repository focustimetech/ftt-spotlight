<?php

use Faker\Generator as Faker;

$factory->define(App\Cluster::class, function (Faker $faker) {
    return [
        'name' => $faker->city(),
        'owner' => $faker->randomElement(App\Staff::pluck('id')->toArray())
    ];
});
