import axios from 'axios'

import { ReduxAction } from '../types/app'
import { INotification } from '../types/staff'
import {
    ARCHIVE_ALL_NOTIFICATIONS,
    ARCHIVE_NOTIFICATION,
    FETCH_NOTIFICATIONS,
    MARK_ALL_NOTIFICATIONS_READ,
    MARK_NOTIFICATION_READ,
    MARK_NOTIFICATION_UNREAD,
    UNARCHIVE_NOTIFICATION
} from './types'

export const archiveAllNotifications = () => {
    return (dispatch: (action: ReduxAction<void>) => void) => {
        axios.put('/api/notifications/archive/all')
        return dispatch({
            type: ARCHIVE_ALL_NOTIFICATIONS,
            payload: null
        })
    }
}

export const archiveNotification = (notification: INotification) => {
    return (dispatch: (action: ReduxAction<INotification>) => void) => {
        axios.put(`/api/notifications/archive/${notification.id}`)
        return dispatch({
            type: ARCHIVE_NOTIFICATION,
            payload: notification
        })
    }
}

export const fetchNotifications = () => {
    return (dispatch: any) => {
        return axios.get('/api/notifications')
            .then((res: any) => {
                const notifications = res.data
                dispatch({
                    type: FETCH_NOTIFICATIONS,
                    payload: notifications
                })
            })
    }
}

export const markAllNotificationsAsRead = () => {
    return (dispatch: (action: ReduxAction<void>) => void) => {
        axios.put('/api/notifications/read/all')
        return dispatch({
            type: MARK_ALL_NOTIFICATIONS_READ,
            payload: null
        })
    }
}

export const markNotificationAsRead = (notification: INotification) => {
    return (dispatch: (action: ReduxAction<INotification>) => void) => {
        axios.put(`/api/notifications/read/${notification.id}`)
        return dispatch({
            type: MARK_NOTIFICATION_READ,
            payload: notification
        })
    }
}

export const markNotificationAsUnread = (notification: INotification) => {
    return (dispatch: (action: ReduxAction<INotification>) => void) => {
        axios.put(`/api/notifications/unread/${notification.id}`)
        return dispatch({
            type: MARK_NOTIFICATION_UNREAD,
            payload: notification
        })
    }
}

export const unarchiveNotification = (notification: INotification) => {
    return (dispatch: (action: ReduxAction<INotification>) => void) => {
        axios.put(`/api/notifications/unarchive/${notification.id}`)
        return dispatch({
            type: UNARCHIVE_NOTIFICATION,
            payload: notification
        })
    }
}
