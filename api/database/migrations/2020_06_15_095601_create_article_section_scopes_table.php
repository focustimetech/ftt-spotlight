<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArticleSectionScopesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('article_section_scopes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('section_id');
            $table->enum('account_type', ['student', 'staff', 'teacher', 'guardian', 'sysadmin']);
            $table->timestamps();
            // Foreign keys
            $table->foreign('section_id')->references('id')->on('article_sections');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('article_section_scopes');
    }
}
