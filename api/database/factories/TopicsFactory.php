<?php

use Faker\Generator as Faker;

$factory->define(App\Topic::class, function (Faker $faker) {
    return [
        'topic' => $faker->sentence(rand(1, 5)),
        'color' => Utils::topicColor()
    ];
});
