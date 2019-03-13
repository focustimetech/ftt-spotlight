<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Tracks which students are enrolled in each class.
 */
class CreateEnrollmentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('enrollment', function (Blueprint $table) {
            $table->increments('enrollment_id');
            $table->integer('student_id'); // Student enrolled
            $table->integer('course_id'); // Course enrolled in
            $table->timestamp('enrolled'); // Date + time student enrolled
            $table->timestamp('dropped') // Date + time student dropped
                ->nullable(); // NULL implies still enrolled
            $table->integer('enrolled_by'); // Teacher who enrolled the student
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('enrollment');
    }
}
