<?php

use Illuminate\Database\Seeder;

class SettingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $settings = [
            [
                'key' => 'school_name',
                'value' => 'My School'
            ],
            [
                'key' => 'include_days',
                'value' => '2,3,4,5,6'
            ]
        ];

        foreach ($settings as $setting) {
            factory(App\Setting::class)->create($setting);
        }
    }
}
