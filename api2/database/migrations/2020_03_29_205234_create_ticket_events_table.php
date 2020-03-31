<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTicketEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * Event sourcing for support tickets.
         */
        Schema::create('ticket_events', function (Blueprint $table) {
            $table->id();
            /**
             * Actions for the ticket. Each action indicates the following:
             * OPEN: User leaves a message for Spotlight, and it is Spotlight's turn to respond
             * CLOSED: Spotlight has closed the ticket
             * RESOLVED: The ticket has been resolved by Spotlight
             * REOPENED: Spotlight has chosen to reopen the ticket
             * AWAIT: Awaiting a response from the user
             */
            $table->enum('action', ['OPEN', 'CLOSED', 'RESOLVED', 'REOPENED', 'AWAIT']);
            $table->string('message');
            $table->foreignId('ticket_id');
            $table->timestamps();
            // Foreign keys
            $table->foreign('ticket_id')->references('id')->on('tickets');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ticket_events');
    }
}
