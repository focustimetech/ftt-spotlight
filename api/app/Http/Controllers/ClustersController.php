<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Cluster;
use App\Student;
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
     * List all Students in each cluster
     */
    public function listAll()
    {
        $students = Cluster::all()->map(function($cluster) {
            return [
                'cluster' => $cluster,
                'students' => $cluster->students()->get()->map(function($student) {
                    return [
                        'name' => $student->name(),
                        'id' => $student->id
                    ];
                })
            ];
        });

        return $students;
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
        $cluster->owner = $request->input('owner');
        $cluster->hidden = $request->input('hidden');
        $cluster->public = $request->input('public');

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

    public function attach(Request $request)
    {
        $students = Student::findOrFail($request->student_ids);
        foreach ($students as $student) {
            $student->clusters()->attach($request->cluster_ids);
        }
        
        return $request;
    }

    public function detach(Request $request)
    {
        return $request;

        $students = Student::findOrFail($request->student_ids);
        foreach ($students as $student) {
            $student->clusters()->detach($request->cluster_ids);
        }
    }
}
