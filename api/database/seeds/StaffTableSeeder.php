<?php

use Illuminate\Database\Seeder;

class StaffTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Staff::class, 20)->create()->each(function ($teacher) {
            factory(App\User::class)->create([
                'user_id' => $teacher->id,
                'username' => $teacher->email,
                'account_type' => 'staff',
                'password' => bcrypt($teacher->email)
            ]);
        });
    }
}
