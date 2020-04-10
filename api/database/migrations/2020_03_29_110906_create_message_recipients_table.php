<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMessageRecipientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * Associates messages with recipients
         */
        Schema::create('message_recipients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('message_id');    // The message being sent
            $table->foreignId('recipient_id');  // The recipient of the message
            $table->timestamps();
            // Foreign keys
            $table->foreign('message_id')->references('id')->on('messages');
            $table->foreign('recipient_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('message_recipients');
    }
}
