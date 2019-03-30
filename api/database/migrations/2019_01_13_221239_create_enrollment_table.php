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
            $table->foregin('student_id')->references('id')->on('students'); // Student enrolled
            $table->foreign('course_id')->references('id')->on('courses'); // Course enrolled in
            $table->timestamp('enrolled_at'); // Date + time student enrolled
            $table->timestamp('dropped_at') // Date + time student dropped
                ->nullable(); // NULL implies still enrolled
            $table->foreign('enrolled_by')->references('id')->on('staff'); // Teacher who enrolled the student
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
