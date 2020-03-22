<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Staff;
use App\Course;
use App\Cluster;
use DB;

class SearchController extends Controller
{
    public function search(Request $request) {
        $query = '%'. $request->get('query'). '%';
        $limit = 5;
        $result = [
            'students' => DB::table('students')
                ->whereRaw("first_name LIKE '$query' OR last_name LIKE '$query' OR CONCAT(first_name, ' ', last_name) LIKE '$query'")
                ->limit($limit)
                ->get(),

            'staff' => Staff::where('last_name', 'like', $query)
                ->limit($limit)
                ->get(),

            'courses' => Course::where('name', 'like', $query)
                ->limit($limit)
                ->get(),

            'clusters' => Cluster::where('name', 'like', $query)
                ->limit($limit)
                ->get()
        ];

        return [
            'query' => $request->get('query'),
            'results' => $result
        ];
    }
}
