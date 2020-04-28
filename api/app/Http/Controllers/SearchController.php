<?php

namespace App\Http\Controllers;

use App\Classroom;
use App\Cluster;
use App\Staff;
use App\Student;
use App\Teacher;
use App\Topic;
use App\Http\Resources\Classroom as ClassroomResource;
use App\Http\Resources\Cluster as ClusterResource;
use App\Http\Resources\Staff as StaffResource;
use App\Http\Resources\Student as StudentResource;
use App\Http\Resources\Teacher as TeacherResource;
use App\Http\Resources\Topic as TopicResource;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(String $queryString) {
        parse_str($queryString, $params);
        $query = $params['q'];
        $user = auth()->user();
        $teachers = TeacherResource::collection(Teacher::search($query)->get());
        
        if ($user->hasRole('student')) {
            return [ 'teacher' => $teachers];
        } else {
            $staff = StaffResource::collection(Staff::search($query)->get());
            if ($user->hasRole('guardian')) {
                return ['teacher' => $teachers, 'staff' => $staff];
            } else {
                return [
                    'teachers' => $teachers,
                    'staff' => $staff,
                    'student' => StudentResource::collection(Student::search($query)->get()),
                    'topic' => TopicResource::collection(Topic::search($query)->get()),
                    'classroom' => ClassroomResource::collection(Classroom::search($query)->get()),
                    // 'cluster' => ClusterResource::collection(Cluster::search($query)->get())
                ];
            }
        }

        return [];
    }
}
