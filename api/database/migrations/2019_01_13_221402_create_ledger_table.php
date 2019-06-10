<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Tracks student attendance of blocks.
 */
class CreateLedgerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ledger', function (Blueprint $table) {
            $table->date('date'); // Date checked in
            $table->time('time'); // Time checked in
            $table->unsignedInteger('block_id'); // Block checked into
            $table->unsignedInteger('staff_id'); // Who checked the student in
            $table->unsignedInteger('student_id'); // Student checked in
            $table->unsignedInteger('topic_id'); // Topic teacher is offering
            // Foreign keys
            $table->foreign('block_id')->references('id')->on('blocks');
            $table->foreign('staff_id')->references('id')->on('staff');
            $table->foreign('student_id')->references('id')->on('students');
            $table->foreign('topic_id')->references('id')->on('topics');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ledger');
    }
}
