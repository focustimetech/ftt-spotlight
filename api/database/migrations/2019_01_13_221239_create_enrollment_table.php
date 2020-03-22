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
            $table->increments('id');
            $table->unsignedInteger('student_id'); // Student enrolled
            $table->unsignedInteger('course_id'); // Course enrolled in
            $table->unsignedInteger('enrolled_by'); // Teacher who enrolled the student
            $table->timestamp('enrolled_at'); // Date + time student enrolled
            $table->timestamp('dropped_at') // Date + time student dropped
                ->nullable(); // NULL implies still enrolled
            // Foreign keys
            $table->foreign('student_id')->references('id')->on('students');
            $table->foreign('course_id')->references('id')->on('courses');
            $table->foreign('enrolled_by')->references('id')->on('staff');
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
