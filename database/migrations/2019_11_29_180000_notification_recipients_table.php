<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class NotificationRecipientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notification_recepients', function (Blueprint $table) {
            $table->unsignedInteger('notification_id');
            $table->unsignedInteger('staff_id');
            $table->boolean('read')
                ->default(false);
            $table->boolean('archived')
                ->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('notification_recepients');
    }
}
