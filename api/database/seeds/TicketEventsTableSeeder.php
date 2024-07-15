<?php

use Illuminate\Database\Seeder;

class TicketEventsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory('App\TicketEvent', 100)->create();
    }
}
