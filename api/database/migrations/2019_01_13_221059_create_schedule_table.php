<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Encodes when courses are happening and who teaches them.
 */
class CreateScheduleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('schedule', function (Blueprint $table) {
            //$table->date('date') // Date of assignment, in case of substitutes
            //    ->default(NULL); // NULL implies default block relationship
            $table->unsignedInteger('block_number');
            $table->unsignedInteger('course_id');
            $table->unsignedInteger('staff_id');
            // Foreign keys
            // $table->foreign('block_number')->references('block_number')->on('blocks'); // When course occurs
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
