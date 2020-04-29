<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGuardiansStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * Associated parents and legal guardians with students.
         */
        Schema::create('guardians_students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('guardian_id');   // The parent or legal guardian
            $table->foreignId('student_id');    // The associated student
            $table->timestamps();
            // Foreign keys
            $table->foreign('guardian_id')->references('id')->on('guardians');
            $table->foreign('student_id')->references('id')->on('students');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('guardians_students');
    }
}
