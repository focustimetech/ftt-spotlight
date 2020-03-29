<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAppointmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * All data on mandatory, student-teacher appointments.
         */
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->string('memo');             // The message or memo for the appointment left for the student
            $table->date('date');               // Date of the appointment
            $table->foreignId('teacher_id');    // The teacher of the appointment
            $table->foreignId('student_id');    // The student being appointed
            $table->foriegnId('block_id');      // The block the appointment occurs on
            $table->foriegnId('classroom_id');  // The classroom the appointment takes place in
            $table->timestamps();               // Timestamp encodes when appointment was created (used for priority)
            // Foreign keys
            $table->foreign('teacher_id')->references('id')->on('teachers');
            $table->foreign('student_id')->references('id')->on('students');
            $table->foreign('block_id')->references('id')->on('blocks');
            $table->foreign('classroom_id')->references('id')->on('classrooms');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('appointments');
    }
}
