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
            $table->date('date');               // Date of the block used for the record
            $table->foriengId('student_id');    // Student being checked in
            $table->foriegnId('block_id');      // Block used for the check-in
            $table->foreignId('teacher_id');    // Teacher that checked the student in
            $table->foreignId('topic_id')       // Topic of the block, if it exists
                ->nullable()
                ->default(null);
            $table->timestamps();               // Timestamp, which encodes when the actual check-in happened
            // Foreign keys
            $table->foreign('student_id')->references('id')->on('students');
            $table->foriegn('block_id')->references('id')->on('blocks');
            $table->forign('teacher_id')->references('id')->on('teachers');
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
