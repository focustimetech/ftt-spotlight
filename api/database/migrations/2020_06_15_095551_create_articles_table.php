<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArticlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();                   // Article's ID
            $table->string('slug');         // Slug for the article, e.g. `check-in-faq`
            $table->string('title');        // Article title, e.g. `Check-in: FAQ`
            $table->mediumText('content');  // Content of the article (markdown)
            $table->foreignId('group_id');  // The group that the article belongs to
            $table->timestamps();
            // Foreign keys
            $table->foreign('group_id')->references('id')->on('article_groups');
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
        Schema::dropIfExists('articles');
    }
}
