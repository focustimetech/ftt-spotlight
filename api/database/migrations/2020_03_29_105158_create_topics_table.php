<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTopicsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * Data on Topics.
         */
        Schema::create('topics', function (Blueprint $table) {
            $table->id();
            $table->string('memo');             // The topic itself that is being instructed. E.g. "Silent reading"
            $table->string('color');            // The color theme of the topic. E.g. "red"
            $table->foreignId('teacher_id');    // The teacher who owns the topic
            $table->foreignId('classroom_id');  // The classroom that the topic takes place in
            // Foreign keys
            $table->foreign('teacher_id')->references('id')->on('teachers');
            $table->foreign('classroom_id')->references('id')->on('classrooms');
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
        Schema::dropIfExists('topics');
    }
}
