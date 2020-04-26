<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\User;
use Faker\Generator as Faker;

$factory->define(User::class, function (Faker $faker) {
    return [
        'first_name' => $faker->firstName(),
        'last_name' => $faker->lastName(),
        'initials' => null,
        'password' => null, // Filled by Observer
        'color' => null, // Filled by Observer
        'account_type' => 'teacher',
        'username' => $faker->unique()->email()
    ];
});
