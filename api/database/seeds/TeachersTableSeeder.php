<?php

use App\Staff;
use App\Teacher;
use App\User;
use Illuminate\Database\Seeder;

class TeachersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Teacher::class, 50)->create();
        $user = factory(User::class)->create([
            'first_name' => 'Spotlight',
            'last_name' => 'Dev',
            'account_type' => 'teacher',
            'username' => 'teacher@focustime.ca'
        ]);
        factory(Staff::class)->create([
            'user_id' => $user->id
        ]);
        factory(Teacher::class)->create([
            'user_id' => $user->id
        ]);
    }
}
