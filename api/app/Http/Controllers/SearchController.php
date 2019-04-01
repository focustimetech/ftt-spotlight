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
        // return $request;
        $result = [];
        //$staff = Staff::where('lastname', 'like', "%$query%");
        $students = DB::table('students')
            ->whereRaw("first_name LIKE '$query' OR last_name LIKE '$query' 
            OR CONCAT(first_name, ' ', last_name) LIKE '$query'")->get();
        //$courses = Courses::where('name', 'like', "%$query%");
        return $students; //array_merge($students, $staff, $courses);
    }
}
