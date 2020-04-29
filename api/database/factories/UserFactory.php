<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\User;
use Faker\Generator as Faker;

$factory->define(User::class, function (Faker $faker) {
    $firstName = $faker->firstName();
    $lastName = $faker->lastName();
    return [
        'first_name' => $firstName,
        'last_name' => $lastName,
        'initials' => null,
        'password' => null, // Filled by Observer
        'color' => null, // Filled by Observer
        'account_type' => 'teacher',
        'username' => str_replace(' ', '', strtolower($firstName . '.' . $lastName . '@example.com'))
    ];
});
