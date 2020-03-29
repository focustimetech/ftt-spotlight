<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTopicsBlocksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * Associates Topics with blocks.
         */
        Schema::create('topics_blocks', function (Blueprint $table) {
            $table->id();
            $table->date('date');           // Date for the topic
            $table->foreignId('topic_id');  // The topic being set up
            $table->foreignId('block_id');  // Associated block
            $table->timestamps();
            // Foreign keys
            $table->foreign('block_id')->references('id')->on('blocks');
            $table->foreign('topic_id')->references('id')->on('topcis');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('topics_blocks');
    }
}
