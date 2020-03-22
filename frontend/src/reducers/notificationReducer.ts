import {
    ARCHIVE_ALL_NOTIFICATIONS,
    ARCHIVE_NOTIFICATION,
    FETCH_NOTIFICATION_INBOX,
    FETCH_NOTIFICATION_OUTBOX,
    MARK_ALL_NOTIFICATIONS_READ,
    MARK_NOTIFICATION_READ,
    MARK_NOTIFICATION_UNREAD,
    UNARCHIVE_NOTIFICATION
} from '../actions/types'

import { ReduxAction } from '../types/app'
import { INotification, INotificationRecieved, INotificationSent } from '../types/staff'

interface IState {
    inbox: INotificationRecieved[]
    outbox: INotificationSent[]
}

const initialState: IState = {
    inbox: [],
    outbox: []
}

export const notificationReducer = (state = initialState, action: ReduxAction<any>): IState => {
    switch (action.type) {
        case ARCHIVE_ALL_NOTIFICATIONS:
            return {
                ...state,
                inbox: []
            }
        case ARCHIVE_NOTIFICATION:
            return {
                ...state,
                inbox: state.inbox.filter((item: INotificationRecieved) => {
                    return item.notification.id !== action.payload.id
                })
            }
        case FETCH_NOTIFICATION_INBOX:
            return {
                ...state,
                inbox: action.payload
            }
        case FETCH_NOTIFICATION_OUTBOX:
                return {
                    ...state,
                    outbox: action.payload
                }
        case MARK_ALL_NOTIFICATIONS_READ:
            return {
                ...state,
                inbox: state.inbox.map((item: INotificationRecieved) => {
                    return { ...item, read: true }
                })
            }
        case MARK_NOTIFICATION_READ:
            return {
                ...state,
                inbox: state.inbox.map((item: INotificationRecieved) => {
                    return item.notification.id === action.payload.id ?  { ...item, read: true } : item
                })
            }
        case MARK_NOTIFICATION_UNREAD:
            return {
                ...state,
                inbox: state.inbox.map((item: INotificationRecieved) => {
                    return item.notification.id === action.payload.id ?  { ...item, read: false } : item
                })
            }
        case UNARCHIVE_NOTIFICATION:
            return state
        default:
            return state
    }
}
