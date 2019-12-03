<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Notification;
use App\NotificationRecipient;
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
        $staff = auth()->user()->staff();
        $notifications = $staff->notificationInbox()->get();

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
        $staff = auth()->user()->staff();
        $notification = NotificationRecipient::where('staff_id', $staff->id)->where('notification_id', $id)->first();
        if (!$notification) {
            return response()->json('Cannot find Notification.', 404);
        }
        $notification->archived = $archived;
        if ($notification->save()) {
            return new NotificationResource($notification->notification()->first());
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
                'read' => $notification_recipient->read == true,
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
        $staff = auth()->user()->staff();
        $notifications = $staff->notificationInbox()->get();
        $notifications->map(function($notification) {
            $notification->markRead();
            return $notification;
        });

        return NotificationResource::collection($notifications->map(function($notification) {
            return $notification->notification()->first();
        }));
    }

    /**
     * Mark a user's specific notification as read.
     * @param id The ID of the notification.
     * @param read Whether or not to mark the notification as read (true
     * by default).
     */
    public function markNotificationRead($id, $read = true)
    {
        $staff = auth()->user()->staff();
        $notification = $staff->notificationInbox()->where('notification_id', $id)->first();
        if (!$notification) {
            return response()->json('Cannot find Notification.', 404);
        }
        $notification->read = $read;
        if ($notification->save()) {
            return new NotificationResource($notification->notification()->first());
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
