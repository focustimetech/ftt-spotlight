<?php

use App\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(User::class, 50)->create();
        factory(User::class)->create([
            'first_name' => 'Spotlight',
            'last_name' => 'Developer',
            'initials' => 'SD',
            'title' => null,
            'account_type' => 'teacher',
            'username' => 'dev@focustime.ca'
        ]);
    }
}
