<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Report;
use App\Http\Resources\Report as ReportResource;

class ReportsController extends Controller
{
    public function index(Request $request)
    {
        $staff = auth()->user()->staff();
        
        return ReportResource::collection($staff->reports()->get());
    }

    public function find($report_id)
    {
        $report = Report::find($report_id);

        if ($report) {
            $staff = auth()->user()->staff();
            if ($report->staff_id !== $staff->id && $report->access !== 'public')
                return response()->json(['message' => 'This Report is private, so only the owner can view it.'], 403);
            else
                return new ReportResource($report);
        } else {
            return response()->json(['message' => 'The Report could not be found.'], 404);
        }
    }

    public function create(Request $request)
    {
        $staff = auth()->user()->staff();

        $report = Report::create([
            'staff_id' => $staff->id,
            'name' => $request->input('name'),
            'segment' => $request->input('segment'),
            'date_range' => json_encode($request->input('date_range')),
            'access' => $request->input('access')
        ]);

        return new ReportResource($report);
    }

    public function update(Request $request)
    {
        $staff = auth()->user()->staff();
        $report = Report::findOrFail($request->input('id'));
        if ($report->staff_id !== $staff->id) {
            return response()->json(['message' => 'Only the owner of this Report can make changes to it.'], 403);
        } else {
            $report->name = $request->input('name');
            $report->segment = $request->input('segment');
            $report->date_range = json_encode($request->input('date_range'));
            $report->access = $request->input('access');

            if ($report->save())
                return new ReportResource($report);
            else
                return response()->json(['message' => 'The Report could not be updated.'], 500);
        }
    }

    public function destroy($report_id)
    {
        $staff = auth()->user()->stafff();
        $report = Report::find($report_id);

        if ($report->staff_id !== $staff->id) {
            return response()->json(['message' => 'Only the owner of this Report can delete it.'], 403);
        } else if ($report->delete()) {
            return new ReportResource($report);
        } else {
            return response()->json(['message' => 'The Report could not be deleted'], 500);
        }
    }
}
