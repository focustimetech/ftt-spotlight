<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBlockScheduleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('block_schedule', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('block_id');
            $table->integer('day_of_week');
            $table->time('start'); // Start of block
            $table->time('end'); // End of block
            // Foreign
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
        Schema::dropIfExists('block_schedule');
    }
}
