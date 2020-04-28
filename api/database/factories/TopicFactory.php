<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

// use Utils;
use App\Classroom;
use App\Teacher;
use App\Topic;
use App\Model;
use Faker\Generator as Faker;

$factory->define(Topic::class, function (Faker $faker) {
    return [
        'memo' => $faker->sentence(4),
        'color' => Utils::randomColor(),
        'teacher_id' => Teacher::all()->random()->id,
        'classroom_id' => Classroom::all()->random()->id
    ];
});
