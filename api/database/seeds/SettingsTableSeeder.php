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
                'name' => 'General settings',
                'description' => 'Common settings for Spotlight',
                'settings' => [
                    [
                        'key' => 'school_name',
                        'value' => 'My School',
                        'description' => 'School name'
                    ],
                    [
                        'key' => 'start_datetime',
                        'value' => date('Y-m-d H:i:s'),
                        'description' => 'Year start',
                        'type' => 'datetime'
                    ],
                    [
                        'key' => 'end_datetime',
                        'value' => date('Y-m-d H:i:s', strtotime('+6 months')),
                        'description' => 'Year end',
                        'type' => 'datetime'
                    ]
                ]
            ],
            [
                'name' => 'Calendar',
                'description' => 'Change calendar settings',
                'settings' => [
                    [
                        'key' => 'include_days',
                        'value' => '2,3,4,5,6',
                        'description' => 'Days included in schedule',
                        'type' => 'weekdays'
                    ]
                ]
            ],
            [
                'name' => 'Air Check-in',
                'description' => 'Control how Air Check-in works',
                'settings' => [
                    [
                        'key' => 'air-check-in',
                        'value' => true,
                        'description' => 'Enable Air Check-in',
                        'type' => 'boolean'
                    ],
                ]
            ],
            [
                'name' => 'Privacy',
                'description' => 'Manage privacy options for Spotlight',
                'settings' => [
                    [
                        'key' => 'show-student-numbers',
                        'value' => false,
                        'description' => 'Show Student Numbers',
                        'type' => 'boolean'
                    ]
                ]
            ]
        ];

        foreach ($settings as $key => $settingsGroup) {
            $id = $key + 1;
            factory(App\SettingsGroup::class)->create([
                'id' => $id,
                'name' => $settingsGroup['name'],
                'description' => $settingsGroup['description']
            ]);
        
            foreach ($settingsGroup['settings'] as $setting) {
                factory(App\Setting::class)->create([
                    'group_id' => $id,
                    'key' => $setting['key'],
                    'value' => $setting['value'],
                    'description' => $setting['description'],
                    'type' => $setting['type'] ?? 'string'
                ]);
            }
        }
    }
}
