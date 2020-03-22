<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Block;
use App\Http\Resources\Block as BlockResource;

class BlockController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Get all blocks
        $blocks = Block::all();

        return BlockResource::collection($blocks);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $block = $request->isMethod('put') ? Block::findOrFail($request->block_id) : new Block;
        
        $block->id = $request->input('block_id');
        $block->block_number = $request->input('block_number');
        $block->flex = $request->input('flex');
        $block->label = $request->input('label');
        $block->day_of_week = $request->input('day_of_week');
        $block->start = $request->input('start');
        $block->end = $request->input('end');
        $block->week = $request->input('week');

        if ($block->save()) return new BlockResource($block);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($time)
    {
        // $blocks = Block::whereRaw('? BETWEEN start AND end', date('H:i:s', $time));

        // return BlockResource::collection($blocks);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $block = Block::findOrFail($id);

        if ($block->delete()) return new BlockResource($block);
    }
}
