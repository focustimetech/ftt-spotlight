<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use App\Ticket;
use App\TicketEvent;
use Faker\Generator as Faker;

$factory->define(TicketEvent::class, function (Faker $faker) {
    $ticket = Ticket::all()->random();

    return [
        'message' => $faker->sentence(20),
        'ticket_id' => $ticket->id,
        'user_id' => $faker->boolean()
            ? $ticket->user_id
            : $ticket->assignee_id
    ];
});
