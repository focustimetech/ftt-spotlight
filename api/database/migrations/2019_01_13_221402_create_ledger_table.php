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
            $table->foreign('block_number')->references('block_number')->on('blocks'); // Block checked into
            $table->foreign('staff_id')->references('id')->on('staff'); // Who checked the student in
            $table->foriegn('student_id')->references('id')->on('student'); // Student checked in
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
