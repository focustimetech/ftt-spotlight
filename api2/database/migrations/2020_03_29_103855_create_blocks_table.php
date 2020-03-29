<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlocksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * All block data stored in `blocks`.
         */
        Schema::create('blocks', function (Blueprint $table) {
            $table->id();
            $table->string('name');                 // Name of the block. E.g. "Focus Block"
            $table->time('start_time');             // Starting time of the block. E.g. "09:26:00"
            $table->time('end_time');               // End time of the block. E.g. "10:15:00"
            $table->timestamp('begins_on');         // Timestamp that the block begins being active
            $table->timestamp('ends_on');           // Timestamp when block is no longer active
            $table->unsignedInteger('week_day');    // Day of the week the block is on
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
        Schema::dropIfExists('blocks');
    }
}
