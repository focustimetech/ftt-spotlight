<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAirRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * Data on pending Air requests
         */
        Schema::create('air_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id');
            $table->foreignId('air_code_id');
            // Foreign keys
            $table->foreign('student_id')->referenes('id')->on('students');
            $table->foreign('air_code_id')->referenes('id')->on('air_codes');
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
