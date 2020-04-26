<?php

namespace App\Http\Controllers;

use App\Classroom;
use App\Cluster;
use App\Staff;
use App\Student;
use App\Teacher;
use App\Http\Resources\Classroom as ClassroomResource;
use App\Http\Resources\Cluster as ClusterResource;
use App\Http\Resources\Staff as StaffResource;
use App\Http\Resources\Student as StudentResource;
use App\Http\Resources\Teacher as TeacherResource;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(String $query) {
        $user = auth()->user();
        $teachers = TeacherResource::collection(Teacher::search($query));
        
        if ($user->hasRole('student')) {
            //return [ 'teachers' => $teachers];
        } else {
            $staff = StaffResource::collection(Staff::search($query));
            if ($user->hasRole('guardian')) {
                //return ['teachers' => $teachers, 'staff' => $staff];
            } else {
                return [
                    //'teachers' => $teachers,
                    'staff' => $staff,
                    'students' => StudentResource::collection(Student::search($query)),
                    //'classrooms' => ClassroomResource::collection(Classroom::search($query)),
                    //'clusters' => ClusterResource::collection(Cluster::search($query))
                ];
            }
        }

        return [];
    }
}
