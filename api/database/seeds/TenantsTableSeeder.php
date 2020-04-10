<?php

use App\Tenant;
use Illuminate\Database\Seeder;

class TenantsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Tenant::class, 4)->create();
        factory(Tenant::class)->create([ 'name' => 'Test School', 'slug' => 'dev' ]);
    }
}
