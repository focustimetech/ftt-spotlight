<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLedgerQueueTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ledger_queue', function (Blueprint $table) {
            $table->id();
            $table->uuid('key');                // The UUID used in the frontend
            $table->string('value');            // The student number or name entry
            $table->date('date');               // Date of the block
            $table->foreignId('block_id');      // The block in question
            $table->foreignId('teacher_id');    // The teacher in question
            $table->timestamps();
            // Foreign keys
            $table->foreign('block_id')->references('id')->on('blocks');
            $table->foreign('teacher_id')->references('id')->on('teachers');
            // Unique keys
            $table->unique(['key', 'date', 'block_id', 'teacher_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ledger_queue');
    }
}
