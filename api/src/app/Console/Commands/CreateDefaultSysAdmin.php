<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\SysAdmin;

class CreateDefaultSysAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'create-default-sysadmin';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Creates a default SysAdmin account.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        echo "Creating default SysAdmin account...\n";
        SysAdmin::create([
            'name' => 'Spotlight',
            'email' => 'spotlight@focustime.ca',
            'color' => 'black',
            'initials' => 'FT'
        ]);
        echo "Created default SysAdmin account.\n";
    }
}
