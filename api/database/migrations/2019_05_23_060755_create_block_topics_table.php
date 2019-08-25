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
            $table->unsignedInteger('block_id');
            $table->timestamps();
            // Foreign keys
            $table->foreign('topic_id')->references('id')->on('topics');
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
        Schema::dropIfExists('block_topics');
    }
}
