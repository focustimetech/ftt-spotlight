<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFavoritesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * Data on favorite users
         */
        Schema::create('favorites', function (Blueprint $table) {
            $table->id();
            $table->foreignId('favorited_id');  // The user being added to the favorite list
            $table->foriegnId('user_id');       // The owner of the favorite list
            $table->timestamps();
            // Foreign keys
            $table->foriegn('favorited_id')->references('id')->on('users');
            $table->foriegn('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('favorites');
    }
}
