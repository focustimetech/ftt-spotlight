<?php

use Illuminate\Database\Seeder;

class LedgerTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $date_start = date('Y-m-d', strtotime('-14 day'));
        for ($x = 0; $x < 14; $x ++) {
            
        }
    }
}
