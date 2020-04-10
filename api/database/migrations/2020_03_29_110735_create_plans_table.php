<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * Stores data on where students plan on attending.
         */
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->date('date');               // Date of the plan
            $table->foreignId('block_id');      // Block for the plan
            $table->foreignId('student_id');    // Student belonging to the plan
            $table->foreignId('teacher_id');    // Teacher that the student intends on visiting
            $table->timestamps();               // Timestamp that the plan was made (potentially for waitlisting)
            // Foreign keys
            $table->foreign('block_id')->references('id')->on('blocks');
            $table->foreign('student_id')->references('id')->on('students');
            $table->foreign('teacher_id')->references('id')->on('teachers');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('plans');
    }
}
