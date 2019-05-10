<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Cluster;
use App\Http\Resources\Cluster as ClusterResource;

class ClustersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $clusters = Cluster::all();

        return ClusterResource::collection($clusters);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $cluster = $request->isMethod('put') ? Cluster::findOrFail($request->cluster_id) : new Cluster;

        $cluster->name = $request->input('name');
        $cluster->hidden = $request->input('hidden');

        if ($cluster->save()) {
            return new ClusterResource($cluster);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $cluster = Cluster::findOrFail($id);

        return new ClusterResource($cluster);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $cluster = Cluster::findOrFail($id);

        if ($cluster->delete()) {
            return new ClusterResource($cluster);
        }
    }
}
