<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventsBlocksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * Associated events with specific blocks.
         */
        Schema::create('events_blocks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id');  // The event
            $table->foreignId('block_id');  // The block the event gets assigned to
            $table->date('date');
            $table->timestamps();
            // Foreign keys
            $table->foreign('event_id')->references('id')->on('events');
            $table->foreign('block_id')->references('id')->on('blocks');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('events_blocks');
    }
}
