<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Starred;
use App\Student;
use App\Cluster;
use App\Course;
use App\Staff;
use App\Http\Resources\Starred as StarredResource;

class StarController extends Controller
{
    private function findFromType($item_type, $id) {
        switch($item_type) {
            case 'student':
                return Student::findOrFail($id);
            case 'cluster':
                return Cluster::findOrFail($id);
            case 'course':
                return Course::findOrFail($id);
            case 'staff':
                return Staff::findOrFail($id);
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $starred = Starred::select('item_id', 'item_type')->where('staff_id', auth()->user()->id)->groupBy('item_type');
        $starred = auth()->user()->staff()->starred()->get()->mapToGroups(function($starred) {
			return [$starred['item_type'] => $this->findFromType($starred['item_type'], $starred['item_id'])];
        });

        return new StarredResource($starred);
    }

    public function star(Request $request)
    {
        $item_type = $request->input('item_type');
        $item_id = $request->input('item_id');
        $starred = new Starred;

        $starred->item_type = $item_type;
        $starred->item_id = $item_id;
        $starred->staff_id = auth()->user()->staff()->id;

        if ($starred->save()) {
            return $this->findFromType($item_type, $item_id);
        }
    }

    public function unstar(Request $request)
    {
        $item_type = $request->input('item_type');
        $item_id = $request->input('item_id');
        $starred = auth()->user()->staff()->starred()->where('item_type', $item_type)->where('item_id', $item_id);

        if ($starred->delete()) {
            return $this->findFromType($item_type, $item_id);
        }
    }

}
