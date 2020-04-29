<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Guardian;
use App\User;
use Faker\Generator as Faker;

$factory->define(Guardian::class, function (Faker $faker) {
    $user = $user = factory(User::class)->create([
        'account_type' => 'guardian'
    ]);

    return [
        'user_id' => $user->id
    ];
});
