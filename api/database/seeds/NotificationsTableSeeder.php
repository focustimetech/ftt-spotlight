<?php

use Illuminate\Database\Seeder;

class NotificationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $staff_list = App\Staff::all();

        $staff_list->each(function($staff) {
            $staff->sendNotification();
        });
    }
}
