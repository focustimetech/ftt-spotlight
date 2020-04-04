<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\User;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(User::class, function (Faker $faker) {
    $gender = $faker->randomElement(['male', 'female']);
    $firstName = $faker->firstName($gender);
    $lastName = $faker->lastName();
    $accountType = $faker->randomElement(['guardian', 'staff', 'student', 'teacher']);
    $isStaff = $accountType === 'staff' || $accountType === 'teacher';

    return [
        'first_name' => $firstName,
        'last_name' => $lastName,
        'title' => $isStaff ? $faker->title($gender) : null,
        'username' => $accountType === 'student' ? $faker->unique()->numberBetween(100000, 999999) : $faker->unique()->safeEmail(),
        'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        'initials' => $firstName[0] . $lastName[0],
        'color' => 'red',
        'account_type' => $accountType,
        // 'remember_token' => Str::random(10),
    ];
});
