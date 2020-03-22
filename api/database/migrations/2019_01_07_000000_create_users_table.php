<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('username')->unique();
            $table->string('password');
            $table->boolean('password_expired')
                ->default(true);
            $table->enum('account_type', ['staff', 'student', 'sysadmin']);
            $table->unsignedInteger('user_id');
            $table->boolean('reenable')
                ->default(false);
            $table->timestamp('disabled_at')
                ->nullable();
                // ->default(null);
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
        Schema::dropIfExists('users');
    }
}
