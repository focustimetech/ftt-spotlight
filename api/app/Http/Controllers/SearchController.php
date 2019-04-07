<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Staff;
use App\Course;
use DB;

class SearchController extends Controller
{
    public function search(Request $request) {
        $query = '%'. $request->get('query'). '%';
        $limit = 6;
        $result = [
            [
                'label' => 'Students',
                'values' => DB::table('students')
                    ->whereRaw("first_name LIKE '$query' OR last_name LIKE '$query' OR CONCAT(first_name, ' ', last_name) LIKE '$query'")
                    ->limit($limit)
                    ->get()
                    ->map(function ($student) {
                        return [
                            'value' => $student->first_name. ' '. $student->last_name,
                            'type' => 'student',
                            'url' => 'students/'. $student->id
                        ];
                    })
            ],
            [
                'label' => 'Staff',
                'values' => Staff::where('last_name', 'like', $query)
                    ->limit($limit)
                    ->get()
                    ->map(function ($staff) {
                        return [
                            'value' => $staff->title. ' '. $staff->first_name. ' '. $staff->last_name,
                            'type' => 'staff',
                            'url' => 'staff/'. $staff->id
                        ];
                    })
            ],
            [
                'label' => 'Courses',
                'values' => Course::where('name', 'like', $query)
                    ->limit($limit)
                    ->get()
                    ->map(function ($course) {
                        return [
                            'value' => $course->name,
                            'type' => 'course',
                            'url' => 'courses/'. $course->short_name // TODO: Add restrictions on short_name. (must be like slug)
                        ];
                    })
            ]
        ];

        return [
            'query' => $request->get('query'),
            'results' => $result
        ];
    }
}
