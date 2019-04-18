<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePlannedTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('planned', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('student_id');
            $table->unsignedInteger('staff_id');
            $table->unsignedInteger('block_number');
            $table->date('date');
            $table->timestamps();
            // Foreign keys
            $table->foreign('student_id')->references('id')->on('students');
            $table->foreign('staff_id')->references('id')->on('staff');
            $table->foreign('block_number')->references('block_number')->on('blocks');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('planned');
    }
}
