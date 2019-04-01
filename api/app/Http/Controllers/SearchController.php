<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Staff;
use App\Courses;
use DB;

class SearchController extends Controller
{
    public function search(Request $request) {
        $query = '%'. $request->get('query'). '%';
        $result = [
            'students' => [],
            'staff' => [],
            'courses' => []
        ];
        $staff = Staff::where('lastname', 'like', "'$query'");
        $students = DB::table('students')
            ->whereRaw("first_name LIKE '$query' OR last_name LIKE '$query' 
            OR CONCAT(first_name, ' ', last_name) LIKE '$query'")->get();
        $courses = Course::where('name', 'like', "'$query'");
        $allResults = [
            'students' => $students,
            'staff' => $staff,
            'courses' => $courses
        ];
        // Pepper search results into array s.t. we always have 15 results or less
        for ($index = 0; count($results) < 15; $index ++) {
            foreach ($allResults as $key => $collection) {
                if ($collection[$index]) {
                    array_push($result[$key], $collection[$index]);
                }
                if (count($results) === 15) break;
            }
        }
        return $result; //array_merge($students, $staff, $courses);
    }
}
