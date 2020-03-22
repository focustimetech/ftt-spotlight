<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

use App\Http\Utils;

class CreateTopicsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('topics', function (Blueprint $table) {
            $table->increments('id');
            $table->string('memo');
            $table->string('color')
                ->default(Utils::topicColor(0));
            $table->boolean('deleted')
                ->default(false);
            $table->boolean('unavailable')
                ->default(false);
            $table->unsignedInteger('staff_id')
                ->nullable();
            $table->timestamps();
            // Foreign keys
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
        Schema::dropIfExists('topics');
    }
}
