<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Starred;

class StarController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $starred = Starred::select('item_id', 'item_type')->where('staff_id', auth()->user()->id)->groupBy('item_type');
        $starred = auth()->user()->staff()->starred()->get()->groupBy('item_type')->select('item_id');

        return new StarredResource($starred);
    }

    public function star(Request $request)
    {
        $starred = new Starred;

        $starred->item_type = $request->input('item_type');
        $starred->item_id = $request->input('item_id');
        $starred->staff_id = auth()->user()->staff()->id;

        if ($starred->save()) {
            return new StarredResource($starred);
        }
    }

    public function unstar(Request $request)
    {
        $starred = auth()->user()->staff()->starred()->where('item_type', $request->item_type)->where('item_id', $request->item_id);

        if ($starred->delete()) {
            return new StarredResource($starred);
        }
    }

}
