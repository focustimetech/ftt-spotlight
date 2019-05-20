<?php

use Illuminate\Database\Seeder;

class BlocksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($x = 1; $x <= 8; $x ++) {
            factory(App\Block::class)->create([
                'flex' => false,
                'label' => "Block $x"
            ]);
        }

        factory(App\Block::class)->create([
            'flex' => true,
            'label' => 'Focus Block'
        ]);
    }
}
