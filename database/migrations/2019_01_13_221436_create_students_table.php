<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->increments('student_id');
            $table->integer('student_number');
            $table->string('first_name');
            $table->string('last_name');
            $table->integer('grade');
            $table->integer('homeroom');
            $table->string('team')
                ->nullable()
                ->default(null);
            $table->string('initials');
            $table->string('password');
            $table->boolean('disabled')
                ->default(false);
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
        Schema::dropIfExists('students');
    }
}
