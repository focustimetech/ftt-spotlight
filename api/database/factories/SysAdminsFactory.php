<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\SysAdmin;
use App\User;
use Faker\Generator as Faker;

$factory->define(SysAdmin::class, function (Faker $faker) {
    $user = factory(User::class)->create([
        'account_type' => 'sysadmin'
    ]);

    return [
        'email' => $user->username,
        'user_id' => $user->id,
    ];
});
