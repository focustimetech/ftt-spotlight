<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Traits\UserUpload;

class ProcessCSV extends Command
{
    use UserUpload;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'process-csv';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Process user CSV files';

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
        $this->processAllFiles();
    }
}
