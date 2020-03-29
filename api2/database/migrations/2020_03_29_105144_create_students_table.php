<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * Stores information about students, not specific to authentication.
         */
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('student_number');   // Student's identification number, used for check-in and sign-in
            $table->foreignId('user_id');       // Student's associated user account
            $table->timestamps();
            // Foreign keys
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('students');
    }
}
