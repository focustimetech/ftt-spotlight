<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * Data about school-wide events that void focus blocks.
         */
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('memo');         // Memo for the event
            $table->foriegnId('staff_id');  // The staff member that made the event
            $table->timestamps();
            // Foriegn keys
            $table->foreign('staff_id')->references('id')->on('staff');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('events');
    }
}
