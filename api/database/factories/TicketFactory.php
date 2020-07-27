<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use App\Ticket;
use App\User;
use Faker\Generator as Faker;

$factory->define(Ticket::class, function (Faker $faker) {
    return [
        'subject' => $faker->sentence(8),
        'user_id' => User::all()->random()->id,
        'status' => $faker->randomElement(['OPEN', 'CLOSED', 'RESOLVED', 'REOPENED'])
    ];
});
