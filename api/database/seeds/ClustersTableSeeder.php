<?php

use App\Cluster;
use Illuminate\Database\Seeder;

class ClustersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Cluster::class, 70)->create();
    }
}
