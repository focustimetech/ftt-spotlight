<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Staff;
use App\User;
use Faker\Generator as Faker;

$factory->define(Staff::class, function (Faker $faker) {
    $user = factory(User::class)->create([
        'account_type' => 'staff'
    ]);

    return [
        'user_id' => $user->id,
        'administrator' => $faker->boolean()
    ];
});
