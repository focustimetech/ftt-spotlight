<?php

namespace App\Http\Controllers;

use App\Http\Resources\Cluster as ClusterResource;
use Illuminate\Http\Request;

class ClustersController extends Controller
{
    /**
     * Retrieves all Clusters belonging to the user.
     */
    public function index(Request $request)
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

        $cluster->name = $request->input('name');
        $cluster->public = $request->input('public');

        if ($cluster->save()) {
            return new ClusterResource($cluster);
        }
    }

    public function delete($id)
    {
        $user = auth()->user();
        $cluster = Cluster::findOrFail($id);

        if ($cluster->isPublic() || $cluster->user()->first()->id === $user->id) {
            if ($cluster->delete()) {
                return new ClusterResource($cluster);
            }
        } else {
            return response()->json(['message' => 'You do not have access to this Cluster.', 403]);
        }
    }
}
