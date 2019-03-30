<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Tracks which students have yet to be claimed
 */
class CreateStudentsToClaimTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students_to_claim', function (Blueprint $table) {
            $table->increments('id');
            $table->foriegn('student_id')->references('id')->on('student'); // Student to claim
            $table->string('token') // Used to retreive entry
                ->unique();
            $table->timestamp('issued_at');
            $table->foriegn('issued_by')->references('id')->on('staff'); // Teacher that 
            $table->timestamp('expires_at') // When the token expires
                ->nullable();
            $table->boolean('claimed') // False until student is claimed
                ->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('students_to_claim');
    }
}
