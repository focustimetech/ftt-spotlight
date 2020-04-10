<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClassroomsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * Data about school classrooms.
         */
        Schema::create('classrooms', function (Blueprint $table) {
            $table->id();
            $table->string('name');                 // Name of the classroom. E.g. "Room 223"
            $table->unsignedInteger('capacity')     // The max number of students in the classroom (0 for no limit)
                ->default(0);
            $table->foreignId('teacher_id');        // The teacher that created the classroom
            $table->timestamps();
            // Foreign keys
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
        Schema::dropIfExists('classrooms');
    }
}
