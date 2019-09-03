<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Notification;
use App\Http\Resources\Notification as NotificationResource;

class NotificationsController extends Controller
{

    /**
     * Archives all of the authorized user's notifications.
     * @return NotificationResource All of the user's now archived notifications.
     */
    public function archiveAllNotifications()
    {
        $notifications = auth()->user()->staff()
            ->notifications()->get();

        $notifications->map(function($notification) {
            $notification->archive();
            return $notification;
        });

        return NotificationResource::collection($notifications);
    }

    /**
     * Archives a user's specific notification.
     * @param if The ID of the notification.
     * @param read Whether or not to mark the notification as archived
     * (true by default).
     */
    public function archiveNotification($id, $archived = true)
    {
        $notification = Notification::findOrFail($id);
        if (auth()->user()->staff()->id === $notification->staff_id) {
            $notification->archived = $archived;
            if ($notification->save())
                return new NotificationResource($notification);
        }
        else {
            return response()->json('Cannot archive Notification.', 403);
        }
    }

    /**
     * Returns all of the authorized user's Notifications.
     * @return NotificationResource All the user's notifications.
     */
    public function index()
    {
        $notifications = auth()->user()->staff()
            ->notifications()->orderBy('created_at', 'desc')->get();
        
        return NotificationResource::collection($notifications);
    }

    /**
     * Mark all user's notifications as read.
     * @return NotificationResource The collection of notifications marked read.
     */
    public function markAllNotificationsRead()
    {
        $notifications = auth()->user()->staff()
            ->notifications()->get();
        $notifications->map(function($notification) {
            $notification->markRead();
            return $notification;
        });

        return NotificationResource::collection($notifications);
    }

    /**
     * Mark a user's specific notification as read.
     * @param id The ID of the notification.
     * @param read Whether or not to mark the notification as read (true
     * by default).
     */
    public function markNotificationRead($id, $read = true)
    {
        $notification = Notification::findOrFail($id);
        if (auth()->user()->staff()->id === $notification->staff_id) {
            $notification->read = $read;
            if ($notification->save())
                return new NotificationResource($notification);
        }
        else {
            return response()->json('Cannot mark Notification as read.', 403);
        }
    }

    /**
     * Mark a user's specific notification as unread.
     * @param id The ID of the notification.
     */
    public function markNotificationUnread($id)
    {
        return $this->markNotificationRead($id, false);
    }

    /**
     * Un-archived a user's specific notification.
     * @param id The ID of the notification.
     */
    public function unarchiveNotification($id)
    {
        return $this->archiveNotification($id, false);
    }
}
