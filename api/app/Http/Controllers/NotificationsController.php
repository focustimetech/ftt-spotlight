<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Notification as NotificationResource;

class NotificationsController extends Controller
{
    public function index()
    {
        $notifications = auth()->user()->staff()->notifications()->get();
        
        return NotificationResource::collection($notifications);
    }
}
