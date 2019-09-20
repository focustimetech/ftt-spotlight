<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

use App\Http\Utils;

class CreateStaffTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('staff', function (Blueprint $table) {
            $table->increments('id');
            $table->enum('staff_type', ['teacher', 'administrator']);
            $table->boolean('administrator')
                ->default(false);
            $table->string('title')
                ->nullable()
                ->default(NULL);
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('initials');
            $table->string('color')
                ->default(Utils::userColor(0));
            $table->unsignedInteger('capacity')
                ->default(30);
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
        Schema::dropIfExists('staff');
    }
}
