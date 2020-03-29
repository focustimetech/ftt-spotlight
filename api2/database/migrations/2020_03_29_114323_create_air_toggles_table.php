<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAirTogglesTable extends Migration
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
        Schema::create('air_toggles', function (Blueprint $table) {
            $table->id();
            $table->boolean('enabled')
                ->default(true);
            $table->foreignId('teacher_id');
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
        Schema::dropIfExists('air_toggles');
    }
}
