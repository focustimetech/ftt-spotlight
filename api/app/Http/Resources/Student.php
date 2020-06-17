<?php

namespace App\Http\Resources;

use App\Block;
use App\LedgerEntry;
use App\Http\Resources\LedgerEntry as LedgerEntryResource;
use App\Http\Resources\User as UserResource;
use Illuminate\Http\Resources\Json\JsonResource;

class Student extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $user = new UserResource($this->user()->first());
        $dayOfWeek = date('w');
        $block = Block::where('week_day', $dayOfWeek)->get()->first(function (Block $block) {
            return strtotime($block->start_time) <= $now && strtotime($block->end_time) > $now;
        });

        $params = array_merge(
            [ 'grade' => $this->grade ],
            $user->toArray($request)
        );

        if ($block) {
            $currentLedgerEntry = LedgerEntry::where('date', date('Y-m-d'))
                ->where('block_id', $block->id)
                ->first();
            if ($currentLedgerEntry) {
                $params['lastCheckIn'] = new LedgerEntryResource($currentLedgerEntry);
            }
        }

        return $params;
    }
}
