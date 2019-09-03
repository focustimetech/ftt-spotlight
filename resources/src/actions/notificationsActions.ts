import axios from 'axios'

import {
    ARCHIVE_ALL_NOTIFICATIONS,
    ARCHIVE_NOTIFICATION,
    FETCH_NOTIFICATIONS,
    MARK_ALL_NOTIFICATIONS_READ,
    MARK_NOTIFICATION_READ,
    MARK_NOTIFICATION_UNREAD,
    UNARCHIVE_NOTIFICATION
} from './types'
import { ReduxAction } from '../types/app'

export const archiveAllNotifications = () => {
    return (dispatch: (action: ReduxAction<void>) => void) => {
        axios.put('/api/notifications/archive/all')
        return dispatch({
            type: ARCHIVE_ALL_NOTIFICATIONS,
            payload: null
        })
    }
}

export const archiveNotification = (notificationID: number) => {
    return (dispatch: (action: ReduxAction<void>) => void) => {
        axios.put(`/api/notifications/archive/${notificationID}`)
        return dispatch({
            type: ARCHIVE_NOTIFICATION,
            payload: null
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

export const markNotificationAsRead = (notificationID: number) => {
    return (dispatch: (action: ReduxAction<void>) => void) => {
        axios.put(`/api/notifications/read/${notificationID}`)
        return dispatch({
            type: MARK_NOTIFICATION_READ,
            payload: null
        })
    }
}

export const markNotificationAsUnread = (notificationID: number) => {
    return (dispatch: (action: ReduxAction<void>) => void) => {
        axios.put(`/api/notifications/unread/${notificationID}`)
        return dispatch({
            type: MARK_NOTIFICATION_UNREAD,
            payload: null
        })
    }
}

export const unarchiveNotification = (notificationID: number) => {
    return (dispatch: (action: ReduxAction<void>) => void) => {
        axios.put(`/api/notifications/unarchive/${notificationID}`)
        return dispatch({
            type: UNARCHIVE_NOTIFICATION,
            payload: null
        })
    }
}
