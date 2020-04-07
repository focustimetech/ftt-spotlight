<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * Data for users that can log in and access Spotlight.
         */
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');   // First name of the user
            $table->string('last_name');    // Surname name of the user
            $table->string('username');     // Username used to sign in
            $table->string('password');     // Encrypted password
            $table->string('initials');     // Initials used in user's avatar
            $table->string('color');        // Color used in user's avatar
            $table->enum('account_type', ['student', 'staff', 'teacher', 'guardian']);
            $table->softDeletes();          // Use soft deletes
            $table->timestamps();
            // Unique indexes
            $table->unique('username');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
