<?php

use App\SysAdmin;
use App\User;
use Illuminate\Database\Seeder;

class SysAdminsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(SysAdmin::class, 3)->create();
        $user = factory(User::class)->create([
            'first_name' => 'Spotlight',
            'last_name' => 'Dev',
            'account_type' => 'sysadmin',
            'username' => 'sysadmin@focustime.ca'
        ]);
        factory(SysAdmin::class)->create([
            'user_id' => $user->id,
            'email' => $user->username
        ]);
    }
}
