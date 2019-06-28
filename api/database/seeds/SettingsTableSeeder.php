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
                'group' => 'General settings',
                'key' => 'school_name',
                'value' => 'My School',
                'description' => 'School name'
            ],
            [
                'group' => 'General settings',
                'key' => 'start_datetime',
                'value' => date('Y-m-d H:i:s'),
                'description' => 'Year start'
            ],
            [
                'group' => 'General settings',
                'key' => 'end_datetime',
                'value' => date('Y-m-d H:i:s', strtotime('+6 months')),
                'description' => 'Year end'
            ],
            [
                'group' => 'Calendar',
                'key' => 'include_days',
                'value' => '2,3,4,5,6',
                'description' => 'Days included in schedule'
            ],
            [
                'group' => 'Air Check-in',
                'key' => 'air-check-in',
                'value' => true,
                'description' => 'Enable Air Check-in'
            ],
            [
                'group' => 'Privacy',
                'key' => 'show-student-numbers',
                'value' => false,
                'description' => 'Show Student Numbers'
            ]
        ];

        foreach ($settings as $setting) {
            factory(App\Setting::class)->create($setting);
        }
    }
}
