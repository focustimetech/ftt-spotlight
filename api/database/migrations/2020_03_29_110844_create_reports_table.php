<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * Data on user-made reports
         */
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');   // User that made the report
            $table->string('name');         // Name of the report
            $table->string('segment');      // Segment of the report
            $table->string('date_range');   // Date range of the report
            $table->boolean('public')       // Whether or not the report can be accessed by others
                ->default(false);
            $table->timestamps();
            // Foreign keys
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reports');
    }
}
