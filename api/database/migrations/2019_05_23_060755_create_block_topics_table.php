<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBlockTopicsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('block_topics', function (Blueprint $table) {
            $table->increments('id');
            $table->date('date');
            $table->unsignedInteger('topic_id');
            $table->unsignedInteger('block_schedule_id');
            $table->timestamps();
            // Foreign keys
            $table->foreign('topic_id')->references('id')->on('topic');
            $table->foreign('block_schedule_id')->references('id')->on('block_schedule');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('block_topics');
    }
}
