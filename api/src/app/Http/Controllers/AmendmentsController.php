<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Amendment;
use App\Http\Resources\Amendment as AmendmentResource;

class AmendmentsController extends Controller
{
    public function create(Request $request)
    {
        $staff = auth()->user()->staff();
        $student_id = $request->input('student_id');
        $block_id = $request->input('block_id');
        $date = date('Y-m-d', strtotime($request->input('date')));
        $memo = $request->input('memo');

        $amendment = Amendment::create([
            'staff_id' => $staff->id,
            'student_id' => $student_id,
            'block_id' => $block_id,
            'date' => $date,
            'memo' => $memo
        ]);

        return new AmendmentResource($amendment);
    }
}
