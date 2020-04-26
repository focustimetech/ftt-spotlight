<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Staff;
use App\Teacher;
use App\User;
use Faker\Generator as Faker;

$factory->define(Teacher::class, function (Faker $faker) {
    $gender = $faker->randomElement(['male', 'female']);

    $user = factory(User::class)->create([
        'first_name' => $faker->firstName($gender),
        'last_name' => $faker->lastName($gender),
        'account_type' => 'teacher'
    ]);

    $staff = Staff::create([
        'user_id' => $user->id,
        'administrator' => $faker->boolean()
    ]);

    return [
        'user_id' => $user->id,
        'title' => $faker->title($gender)
    ];
});
