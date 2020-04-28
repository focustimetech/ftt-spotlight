<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClustersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * Data on student clusters.
         */
        Schema::create('clusters', function (Blueprint $table) {
            $table->id();
            $table->string('name');         // Name of the cluster
            $table->boolean('public')       // Whether or not the cluster is visible to others
                ->default(false);
            $table->foreignId('user_id');   // The user that owns the cluster
            $table->timestamps();
            // Foreign
            $table->foreign('user_id')->references('id')->on('users');
        });

        /**
         * Create a FULLTEXT index for fast searching.
         */
        DB::statement('ALTER TABLE `clusters` ADD FULLTEXT search(`name`)');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('clusters');
    }
}
