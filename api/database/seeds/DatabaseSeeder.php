<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(BlocksTableSeeder::class);
        $this->call(StudentsTableSeeder::class);
        $this->call(StaffTableSeeder::class);
        $this->call(TeachersTableSeeder::class);
        $this->call(GuardiansTableSeeder::class);
        $this->call(TenantsTableSeeder::class);
        $this->call(ClassroomsTableSeeder::class);
        $this->call(SettingsTableSeeder::class);
        $this->call(TopicsTableSeeder::class);
        $this->call(ClustersTableSeeder::class);
        $this->call(ScheduledTopicsTableSeeder::class);
        $this->call(PlansTableSeeder::class);
        $this->call(SysAdminsTableSeeder::class);
    }
}
