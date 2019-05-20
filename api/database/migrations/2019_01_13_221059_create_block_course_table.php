<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Encodes when courses are happening and who teaches them.
 */
class CreateBlockCourseTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('block_course', function (Blueprint $table) {
            $table->unsignedInteger('block_id');
            $table->unsignedInteger('course_id');
            $table->unsignedInteger('staff_id');
            // Foreign keys
            $table->foreign('block_id')->references('id')->on('blocks'); 
            $table->foreign('course_id')->references('id')->on('courses'); // The course occuring
            $table->foreign('staff_id')->references('id')->on('staff'); // Who teaches the course
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('schedule');
    }
}
