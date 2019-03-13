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
            $table->date('date') // Date of assignment, in case of substitutes
                ->default(NULL); // NULL implies default block relationship
            $table->integer('block_number'); // When course occurs
            $table->integer('course_id'); // The course occuring
            $table->integer('staff_id'); // Who teaches the course
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
