<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Cluster;
use App\Staff;
use App\Teacher;
use App\Model;
use Faker\Generator as Faker;

$factory->define(Cluster::class, function (Faker $faker) {
    $userId = $faker->boolean() ? Staff::all()->random()->id : Teacher::all()->random()->id;
    return [
        'name' => $faker->sentence(3),
        'public' => $faker->boolean(),
        'user_id' => $userId
    ];
});
