<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Tenant;
use Faker\Generator as Faker;

$factory->define(Tenant::class, function (Faker $faker) {
    $name = $faker->city();
    return [
        'name' => $name,
        'slug' => strtolower(str_replace(' ', '', $name)),
        'locale' => 'en',
        'region' => 'us-west-1'
    ];
});
