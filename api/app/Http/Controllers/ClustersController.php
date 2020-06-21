<?php

namespace App\Http\Controllers;

use App\Cluster;
use App\Http\Resources\Cluster as ClusterResource;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ClustersController extends Controller
{
    public function index(Request $request)
    {
        return ClusterResource::collection(Cluster::where('public', true)->get());
    }

    /**
     * Retrieves all Clusters belonging to the user.
     */
    public function list(Request $request)
    {
        return ClusterResource::collection($request->user()->clusters()->get());
    }

    /**
     * Returns a given Cluster by ID. Fails if the Cluster is not accessible to the user.
     */
    public function find($id)
    {
        $user = auth()->user();
        $cluster = Cluster::findOrFail($id);

        if ($cluster->isPublic() || $cluster->user()->first()->id === $user->id) {
            return new ClusterResource($cluster);
        } else {
            return response()->json(['message' => 'You do not have access to this Cluster.', 403]);
        }
    }

    public function create(Request $request)
    {
        $user = auth()->user();
        $cluster = Cluster::create([
            'name' => $request->input('name'),
            'public' => $request->input('public'),
            'user_id' => $user->id
        ]);

        return new ClusterResource($cluster);
    }

    public function update(Request $request)
    {
        $user = auth()->user();
        $cluster = Cluster::findOrFail($request->input('id'));

        if ($cluster->user()->first()->id === $user->id) {
            $cluster->name = $request->input('name');
            $cluster->public = $request->input('public');

            if ($cluster->save()) {
                return new ClusterResource($cluster);
            }
        } else {
            return response()->json(['message' => 'You do not have access to this Cluster.', 403]);
        }
    }

    public function delete($id)
    {
        $user = auth()->user();
        $cluster = Cluster::findOrFail($id);

        if ($cluster->user()->first()->id === $user->id) {
            if ($cluster->delete()) {
                return new ClusterResource($cluster);
            }
        } else {
            return response()->json(['message' => 'You do not have access to this Cluster.', 403]);
        }
    }

    public function addStudents(Request $request)
    {
        $user = auth()->user();
        $clusterId = $request->route('id');
        $cluster = Cluster::findOrFail($clusterId);

        if ($cluster->user()->first()->id === $user->id) {
            $cluster->students()->syncWithoutDetaching($request->input('studentIds'));
            return new Response('', 204);
        } else {
            return response()->json(['message' => 'You do not have access to this Cluster.', 403]);
        }
    }

    public function removeStudents(Request $request)
    {
        $user = auth()->user();
        $clusterId = $request->route('id');
        $cluster = Cluster::findOrFail($clusterId);

        if ($cluster->user()->first()->id === $user->id) {
            $cluster->students()->detach($request->input('studentIds'));
            return new Response('', 204);
        } else {
            return response()->json(['message' => 'You do not have access to this Cluster.', 403]);
        }
    }
}
