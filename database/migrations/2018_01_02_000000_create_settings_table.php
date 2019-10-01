<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->increments('id');
            $table->string('key');
            $table->string('description');
            $table->string('type')->default('string');
            $table->integer('min')->default(0);
            $table->integer('max')->default(255);
            $table->string('value');
            $table->boolean('authenticated')
                ->default(true);
            $table->unsignedInteger('group_id');
            // Foreign keys
            $table->foreign('group_id')->references('id')->on('settings_groups');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('settings');
    }
}
