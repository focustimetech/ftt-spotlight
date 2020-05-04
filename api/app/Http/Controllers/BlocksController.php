<?php

namespace App\Http\Controllers;

use App\Block;
use App\Http\Resources\Block as BlockResource;
use Illuminate\Http\Request;

class BlocksController extends Controller
{
    public function index(Request $request)
    {
        return BlockResource::collection(Block::all());
    }
}
