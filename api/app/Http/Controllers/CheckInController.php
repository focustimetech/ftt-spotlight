<?php

namespace App\Http\Controllers;

use Utils;
use App\AirCode;
use App\LedgerEntry;
use App\Student;
use App\Http\Resources\AirCode as AirCodeResource;
use App\Http\Resources\LedgerEntry as LedgerEntryResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CheckInController extends Controller
{
    public function studentCheckIn(Request $request)
    {
        $studentId = $request->input('studentId');
        if (!Student::find($studentId)) {
            return response()->json(['message' => 'The student could not be found.'], 404);
        }
        $teacher = auth()->user()->account();
        $blockId = $request->input('blockId');
        try {
            $date = date('Y-m-d', strtotime($request->input('date')));
        } catch (Exception $e) {
            $date = date('Y-m-d');
        }
        $existingEntry = LedgerEntry::where('date', $date)
            ->where('block_id', $blockId)
            ->where('student_id', $studentId)
            ->where('teacher_id', $teacher->id)
            ->first();
        if ($existingEntry) {
            return new LedgerEntryResource($existingEntry);
        }
        $topic = $teacher->topic($date, $blockId)->first();
        if (!$topic) {
            return response()->json(['message' => 'No Topic was scheduled for the given block.'], 404);
        }

        return new LedgerEntryResource(LedgerEntry::create([
            'date' => $date,
            'memo' => $topic->memo,
            'method' => 'search',
            'classroom_id' => $topic->classroom_id,
            'student_id' => $studentId,
            'block_id' => $blockId,
            'teacher_id' => $teacher->id
        ]));
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
