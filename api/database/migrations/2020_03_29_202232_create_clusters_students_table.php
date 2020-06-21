<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClustersStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * Associates students with clusters.
         */
        Schema::create('clusters_students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cluster_id');    // The cluster
            $table->foreignId('student_id');    // The student belonging to the cluster
            $table->timestamps();
            // Foreign keys
            $table->foreign('cluster_id')->references('id')->on('clusters');
            $table->foreign('student_id')->references('id')->on('students');
            // Unique keys
            $table->unique(['cluster_id', 'student_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('clusters_students');
    }
}
