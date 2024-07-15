<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTicketsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * Support tickets
         */
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->string('subject');          // Subject of the ticket
            $table->foreignId('user_id');       // User that opened the ticket
            $table->foreignId('assignee_id');   // Spotlight team member assigned with the ticket
            $table->enum('status', ['OPEN', 'CLOSED', 'RESOLVED', 'REOPENED']); // Status of the ticket
            $table->timestamps();
            // Foreign keys
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('assignee_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tickets');
    }
}
