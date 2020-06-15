<?php

namespace App\Http\Controllers;

use Utils;
use App\AirCode;
use App\Http\Resources\AirCode as AirCodeResource;
use Illuminate\Http\Request;

class CheckInController extends Controller
{
    public function updateBuffer(Request $request)
    {

    }

    public function createAirCode(Request $request)
    {
        $teacher = auth()->user()->account();
        $blockId = $request->input('blockId');
        $date = $request->input('date');

        // Disable a code that's already in use
        $currentCode = AirCode::where('teacher_id', $teacher->id)
            ->where('date', $date)
            ->where('block_id', $blockId)
            ->first();
        if ($currentCode) {
            $currentCode->expires_at = date('Y-m-d H:i:s');
            if (!$currentCode->save()) {
                return response()->json(['Could not remove the current Air Check-in code.'], 500);
            }
        }

        $existingCode = null;
        do {
            $code = Utils::generateRandomCode(6);
            $existingCode = AirCode::firstWhere('code', $code);
        } while ($existingCode);

        $newCode = AirCode::create([
            'code' => $code,
            'block_id' => $blockId,
            'date' => $date,
            'teacher_id' => $teacher->id
        ]);

        if ($newCode) {
            return new AirCodeResource($newCode);
        }
    }
}
