<?php

namespace App\Http\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\User;
use App\Staff;
use App\Student;
use \MaatWebsite\Excel;

trait UserUpload
{
    public function upload(Request $request)
    {

    }

    public function processAllFiles()
    {
        Storage::files('student-uploads')->each(function($file) {
            $this->processFile($file, 'student');
        });
        Storage::files('staff-uploads')->each(function($file) {
            $this->processFile($file, 'staff');
        });
    }

    public function processFile($filename, $account_type)
    {
        Excel::load($filename)->each(function($csvLine) {
            if ($account_type === 'staff') {
                Staff::create([
                    'email' => $csvLine->get('email'),
                    'first_name' => $csvLine->get('first_name'),
                    'last_name' => $csvLine->get('last_name'),
                    'title' => $csvLine->get('title')
                ]);
            } else if ($account_type === 'student') {
                Student::create([
                    'student_number' => $csvLine->get('student_number'),
                    'first_name' => $csvLine->get('first_name'),
                    'last_name' => $csvLine->get('last_name'),
                    'grade' => $csvLine->get('grade')
                ]);
            }
        });
    }
}
