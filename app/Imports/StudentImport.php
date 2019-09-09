<?php

namespace App\Imports;

use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use App\Student;

class StudentImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        return new Student([
            'student_number'  => $row['student_number'],
            'first_name' => $row['first_name'],
            'last_name'  => $row['last_name'],
            'grade' => $row['grade'],
        ]);
    }
}
