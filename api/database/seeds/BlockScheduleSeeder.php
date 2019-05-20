<?php

use Illuminate\Database\Seeder;

class BlockScheduleSeeder extends Seeder
{
    public function run()
    {
        $blocks = [
            '2' => [ // Monday
                [
                    'id' => 1,
                    'start' => '08:25:00',
                    'end' => '09:21:00',
                ],
                [
                    'id' => 2,
                    'start' => '10:11:00',
                    'end' => '11:07:00',
                ],
                [
                    'id' => 3,
                    'start' => '11:12:00',
                    'end' => '12:08:00',
                ],
                [
                    'id' => 4,
                    'start' => '13:01:00',
                    'end' => '13:57:00',
                ],
                [
                    'id' => 5,
                    'start' => '14:03:00',
                    'end' => '14:59:00',
                ]
            ],
            '3' => [ // Tuesday
                [
                    'id' => 6,
                    'start' => '08:25:00',
                    'end' => '09:21:00',
                ],
                [
                    'id' => 9,
                    'start' => '09:26:00',
                    'end' => '10:06:00',
                ],
                [
                    'id' => 7,
                    'start' => '10:11:00',
                    'end' => '11:07:00',
                ],
                [
                    'id' => 8,
                    'start' => '11:12:00',
                    'end' => '12:08:00',
                ],
                [
                    'id' => 1,
                    'start' => '13:01:00',
                    'end' => '13:57:00',
                ],
                [
                    'id' => 2,
                    'start' => '14:03:00',
                    'end' => '14:59:00',
                ]
            ],
            '4' => [ // Wednesday
                [
                    'id' => 3,
                    'start' => '08:25:00',
                    'end' => '09:21:00',
                ],
                [
                    'id' => 9,
                    'start' => '09:26:00',
                    'end' => '10:06:00',
                ],
                [
                    'id' => 4,
                    'start' => '10:11:00',
                    'end' => '11:07:00',
                ],
                [
                    'id' => 5,
                    'start' => '11:12:00',
                    'end' => '12:08:00',
                ],
                [
                    'id' => 6,
                    'start' => '13:01:00',
                    'end' => '13:57:00',
                ],
                [
                    'id' => 7,
                    'start' => '14:03:00',
                    'end' => '14:59:00',
                ]
            ],
            '5' => [ // Thursday
                [
                    'id' => 8,
                    'start' => '08:25:00',
                    'end' => '09:21:00',
                ],
                [
                    'id' => 9,
                    'start' => '09:26:00',
                    'end' => '10:06:00',
                ],
                [
                    'id' => 1,
                    'start' => '10:11:00',
                    'end' => '11:07:00',
                ],
                [
                    'id' => 2,
                    'start' => '11:12:00',
                    'end' => '12:08:00',
                ],
                [
                    'id' => 3,
                    'start' => '13:01:00',
                    'end' => '13:57:00',
                ],
                [
                    'id' => 4,
                    'start' => '14:03:00',
                    'end' => '14:59:00',
                ]
            ],
            '6' => [ // Friday
                [
                    'id' => 5,
                    'start' => '08:25:00',
                    'end' => '09:21:00',
                ],
                [
                    'id' => 9,
                    'start' => '09:26:00',
                    'end' => '10:06:00',
                ],
                [
                    'id' => 9,
                    'start' => '09:26:00',
                    'end' => '10:22:00',
                ],
                [
                    'id' => 6,
                    'start' => '10:27:00',
                    'end' => '11:23:00',
                ],
                [
                    'id' => 7,
                    'start' => '11:58:00',
                    'end' => '12:54:00',
                ],
                [
                    'id' => 8,
                    'start' => '12:59:00',
                    'end' => '13:55:00',
                ]
            ],
        ];

        foreach($blocks as $day => $day_blocks) {
            foreach ($day_blocks as $block) {
                factory(App\BlockSchedule::class)->create([
                    'block_id' => $block['id'],
                    'start' => $block['start'],
                    'end' => $block['end'],
                    'day_of_week' => $day
                ]);
            }
        }
    }
}
