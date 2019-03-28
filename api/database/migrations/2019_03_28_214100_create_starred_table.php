<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStarredTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('starred', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->integer('staff_id');
            $table->enum('item_type', [
                'staff',
                'student',
                'cluster',
                'report'
            ]);
            $table->integer('item_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('starred');
    }
}
