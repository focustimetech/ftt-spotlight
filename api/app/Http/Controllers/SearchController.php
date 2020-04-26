<?php

namespace App\Http\Controllers;

use App\Classroom;
use App\Cluster;
use App\Staff;
use App\Student;
use App\Teacher;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(String $query) {
        $user = auth()->user();
        $teachers = Teacher::search($query);
        
        if ($user->hasRole('student')) {
            return [ 'teachers' => $teachers];
        } else {
            $staff = Staff::search($query);
            if ($user->hasRole('guardian')) {
                return ['teachers' => $teachers, 'staff' => $staff];
            } else {
                return [
                    'teachers' => $teachers,
                    'staff' => $staff,
                    'students' => Students::search($query),
                    'classrooms' => Classrooms::search($query),
                    'clusters' => Cluster::search($query)
                ];
            }
        }
    }
}
