<?php

namespace App\Http\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
use App\User;
use App\Staff;
use App\Student;
use App\Imports\StudentImport;

trait UserUpload
{
    public function upload(Request $request)
    {

    }

    public function processAllFiles()
    {
        collect(Storage::files('student-uploads'))->each(function($file) {
            $this->processFile($file, 'student');
        });
        collect(Storage::files('staff-uploads'))->each(function($file) {
            $this->processFile($file, 'staff');
        });
    }

    public function processFile($filename, $account_type)
    {
        if ($account_type === 'staff') {
            Excel::import(new Staff, $filename);
        }
        else if ($account_type === 'student') {
            Excel::import(new StudentImport, $filename);
            echo "processing students.";
        }
    }
}
