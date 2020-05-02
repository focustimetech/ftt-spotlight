<?php

namespace App\Http\Controllers;

use App\Http\Resources\Cluster as ClusterResource;
use Illuminate\Http\Request;

class ClustersController extends Controller
{
    public function index(Request $request)
    {
        return ClusterResource::collection($request->user()->clusters()->get());
    }
}
