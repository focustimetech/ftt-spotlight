<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTicketEventFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * Used to attach files to ticket responses,
         */
        Schema::create('ticket_event_files', function (Blueprint $table) {
            $table->id();
            $table->string('path');                 // Path to the file
            $table->foreignId('ticket_event_id');   // The ticket event attaching the file to
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ticket_event_files');
    }
}
