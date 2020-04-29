<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAmendmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * Data on amendments
         */
        Schema::create('amendments', function (Blueprint $table) {
            $table->id();
            $table->string('memo');             // The memo for the amendment
            $table->date('date');               // The date of the amendment
            $table->foreignId('block_id');      // The block for the amendment
            $table->foreignId('student_id');    // The student being amended
            $table->foreignId('staff_id');      // The staff that created the amendment
            $table->timestamps();
            // Foreign keys
            $table->foreign('block_id')->references('id')->on('blocks');
            $table->foreign('student_id')->references('id')->on('students');
            $table->foreign('staff_id')->references('id')->on('staff');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('amendments');
    }
}
