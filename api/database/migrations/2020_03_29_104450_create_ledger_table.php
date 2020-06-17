<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLedgerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * Stores all check-in data.
         */
        Schema::create('ledger', function (Blueprint $table) {
            $table->id();
            $table->date('date');                                           // Date of the block used for the record
            $table->string('memo');                                         // Memo for the block, typically the topic's memo
            $table->enum('method', ['plan', 'air', 'search', 'number']);    // The method by which the student is checked in
            $table->foreignId('classroom_id');                              // ID of the classroom being checked into
            $table->foreignId('student_id');                                // Student being checked in
            $table->foreignId('block_id');                                  // Block used for the check-in
            $table->foreignId('teacher_id');                                // Teacher that checked the student in
            $table->timestamps();                                           // Timestamp, which encodes when the actual check-in happened
            // Foreign keys
            $table->foreign('student_id')->references('id')->on('students');
            $table->foreign('block_id')->references('id')->on('blocks');
            $table->foreign('teacher_id')->references('id')->on('teachers');
            $table->foreign('classroom_id')->references('id')->on('classrooms');
            // Unique keys
            $table->unique(['student_id', 'block_id', 'date']);
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
