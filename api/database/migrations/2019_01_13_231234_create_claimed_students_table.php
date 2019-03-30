<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Encodes which students belong to which parents.
 */
class CreateClaimedStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('claimed_students', function (Blueprint $table) {
            $table->foriegn('parent_id')->references('id')->on('parents');
            $table->foreign('student_id')->references('id')->on('student');
            $table->timestamp('claimed_at'); // When the student was claimed
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('claimed_students');
    }
}
