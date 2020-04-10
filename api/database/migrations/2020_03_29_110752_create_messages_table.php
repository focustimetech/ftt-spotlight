<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * Stores messages sent in the app.
         */
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->string('message');          // The actual message
            $table->foreignId('sender_id');     // The User that sent the message
            $table->timestamps();
            // Foreign keys
            $table->foreign('sender_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('messages');
    }
}
