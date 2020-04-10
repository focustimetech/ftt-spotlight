<?php

namespace Tests\Unit;

use App\Student;
use PHPUnit\Framework\TestCase;

class StudentTest extends TestCase
{
    public function testStudentHasAllParemeters()
    {
        factory(Student::class)->create();
        $student->assertTrue(true);
    }
}
