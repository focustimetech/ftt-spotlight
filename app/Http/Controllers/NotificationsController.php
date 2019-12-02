<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Notification;
use App\Staff;
use App\Http\Resources\Notification as NotificationResource;
use App\Http\Resources\Staff as StaffResource;

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
     */
    public function inbox()
    {
        $staff = auth()->user()->staff();
        $inbox = $staff->notificationInbox()->get()->map(function($notification_recipient) {
            return [
                'read' => $notification_recipient->read,
                'notification' => new NotificationResource(Notification::findOrFail($notification_recipient->notification_id))
            ];
        });
        
        return $inbox;
    }

    /**
     * Returns all of the authorized user's outgoing Notifications,
     */
    public function outbox()
    {
        $staff = auth()->user()->staff();
        $outbox = $staff->notificationOutbox()->get()->map(function($notification) {
            $recipient_ids = $notification->recipients()->get()->pluck('staff_id');
            return [
                'recipients' => StaffResource::collection(Staff::find($recipient_ids)),
                'notification' => new NotificationResource($notification)
            ];
        });

        return $outbox;
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

    /**
     * Allows the authorized user to send notifications to other users.
     */
    public function sendNotification($id)
    {
        $recipient_ids = $request->input('recipient_ids');
        $body = $request->input('body');
    }
}
