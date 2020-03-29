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
            $table->string('memo')      // Optional memo on the purpose of the Air request
                ->nullable()
                ->default(null);
            $table->date('plan_id');    // The associated plan
            $table->timestamps();
            // Foreign keys
            $table->foreign('plan_id')->references('id')->on('plan');
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
