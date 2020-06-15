<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArticleGroupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('article_groups', function (Blueprint $table) {
            $table->id();                       // Article group's ID
            $table->string('slug');             // Slug for the article group, e.g. `student-attendance`
            $table->string('title');            // Article title, e.g. `Student Attendance`
            $table->foreignId('section_id');    // The article section that the article belongs to
            $table->timestamps();
            // Foreign keys
            $table->foreign('section_id')->references('id')->on('article_sections');
            // Unique keys
            $table->unique('slug');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('article_groups');
    }
}
