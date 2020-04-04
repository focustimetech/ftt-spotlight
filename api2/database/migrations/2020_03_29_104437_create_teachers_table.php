<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTeachersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * Information about teachers, not specific to authentication.
         */
        Schema::create('teachers', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('unavailability_limit')     // The limit on the number of unavailabilities (0 if no limit)
                ->default(0);
            $table->softDeletes();                              // Use soft deletes.
            $table->foreignId('user_id');                       // The associated user account
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
        Schema::dropIfExists('teachers');
    }
}
