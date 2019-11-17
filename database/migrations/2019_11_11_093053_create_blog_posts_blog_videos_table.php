<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBlogPostsBlogVideosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blog_posts_blog_videos', function (Blueprint $table) {
            $table->unsignedInteger('blog_post_id');
            $table->unsignedInteger('blog_video_id');
            // Foreign keys
            $table->foreign('blog_post_id')->references('id')->on('blog_posts');
            $table->foreign('blog_video_id')->references('id')->on('blog_videos');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('blog_posts_blog_videos');
    }
}
