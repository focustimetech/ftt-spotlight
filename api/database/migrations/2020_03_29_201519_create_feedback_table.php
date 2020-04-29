<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFeedbackTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * Customer feedback data.
         */
        Schema::create('feedback', function (Blueprint $table) {
            $table->id();
            $table->string('message');      // The feedback being provided
            $table->foreignId('user_id');   // The user providing feedback
            $table->timestamps();           // Timestamp for when feedback was provided
            // Foreign keys
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('feedback');
    }
}
