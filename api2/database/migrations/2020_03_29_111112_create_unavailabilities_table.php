<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUnavailabilitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * Data on dates and times that teachers are not available.
         */
        Schema::create('unavailabilities', function (Blueprint $table) {
            $table->id();
            $table->date('date');               // Date of the unavailability
            $table->foreignId('teacher_id');    // Teacher who is unavailable
            $table->foreignId('block_id');      // Block of the unavailability
            $table->timestamps();
            // Foreign keys
            $table->foreign('teacher_id')->references('id')->on('teachers');
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
        Schema::dropIfExists('unavailabilities');
    }
}
