<?php

use App\Staff;
use App\User;
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
        factory(Staff::class, 20)->create();
        $user = factory(User::class)->create([
            'first_name' => 'Spotlight',
            'last_name' => 'Dev',
            'account_type' => 'staff',
            'username' => 'staff@focustime.ca'
        ]);
        factory(Staff::class)->create([
            'user_id' => $user->id
        ]);
    }
}
