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
        $this->call(StaffTableSeeder::class);
        $this->call(ClustersTableSeeder::class);
        $this->call(BlocksTableSeeder::class);
        $this->call(BlockScheduleSeeder::class);
        $this->call(CoursesTableSeeder::class);
        $this->call(StudentsTableSeeder::class);
        $this->call(LedgerTableSeeder::class);
        // $this->call(AppointmentsTableSeeder::class);
        $this->call(SchedulePlansTableSeeder::class);


        //$this->call(CalendarTableSeeder::class);
        //$this->call(EventsTableSeeder::class);
        //$this->call(ParentsTableSeeder::class);
        //$this->call(ClaimedStudentsTableSeeder::class);
        //$this->call(StudentsToClaimTableSeeder::class);
    }
}
