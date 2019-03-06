<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Stores special dates an calendar exceptions.
 */
class CreateCalendarTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('calendar', function (Blueprint $table) {
            $table->date('date'); // Date of change
            $table->integer('block_number') // Block being affected
                ->default(NULL); // NULL implies entire day
            $table->integer('event_id'); // The event occuring
            $table->integer('creator'); // Who made the calendar change
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('calendar');
    }
}
