<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAirRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('air_requests', function (Blueprint $table) {
            $table->increments('id');
            $table->date('date');
            $table->unsignedInteger('staff_id');
            $table->unsignedInteger('student_id');
            $table->unsignedInteger('block_id');
            $table->timestamps();
            // Foreign keys
            $table->foreign('staff_id')->references('id')->on('staff');
            $table->foreign('student_id')->references('id')->on('students');
            $table->foreign('block_id')->references('id')->on('blocks');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('air_requests');
    }
}
