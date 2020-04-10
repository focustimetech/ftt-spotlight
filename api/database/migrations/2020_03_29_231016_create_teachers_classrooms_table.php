<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTeachersClassroomsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * Associates teachers with classrooms
         */
        Schema::create('teachers_classrooms', function (Blueprint $table) {
            $table->id();
            $table->boolean('default')
                ->default(true);
            $table->foreignId('teacher_id');    // The teacher
            $table->foreignId('classroom_id');  // The classroom associated with the teacher
            $table->timestamps();
            // Foreign keys
            $table->foreign('teacher_id')->references('id')->on('teachers');
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
        Schema::dropIfExists('teachers_classrooms');
    }
}
