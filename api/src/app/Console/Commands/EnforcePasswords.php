<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Traits\Authenticate;

class EnforcePasswords extends Command
{
    use Authenticate;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'enforce-passwords';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Enforce password policy by flagging users with default passwords.';

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
        $this->enforcePasswordPolicy();
    }
}
