<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAirCodesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * Event sourcing of the Air Requests status of teachers. Encodes whether or not Air Requests are enabled for
         * a given teacher, as well as how often they use the feature and for how long.
         */
        Schema::create('air_codes', function (Blueprint $table) {
            $table->id();
            $table->string('code');                 // The code students use to Air check-in
            $table->date('date');                   // The date of the toggle
            $table->foreignId('teacher_id');        // The teacher acceping the Air requests
            $table->foreignId('block_id');          // The block of the toggle
            $table->timestamp('expires_at', 0)      // When the code expires
                ->default(null);
            $table->timestamps();
            // Foreign keys
            $table->foreign('teacher_id')->references('id')->on('teachers');
            // Unique keys
            $table->unique('code');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('air_codes');
    }
}
