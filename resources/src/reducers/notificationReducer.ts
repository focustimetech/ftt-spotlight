import {
    ARCHIVE_ALL_NOTIFICATIONS,
    ARCHIVE_NOTIFICATION,
    FETCH_NOTIFICATIONS,
    MARK_ALL_NOTIFICATIONS_READ,
    MARK_NOTIFICATION_READ,
    MARK_NOTIFICATION_UNREAD,
    UNARCHIVE_NOTIFICATION
} from '../actions/types'

import { INotification } from '../types/staff'
import { ReduxAction } from '../types/app'

interface IState {
    items: INotification[]
}

const initialState: IState = {
    items: []
}

export const notificationReducer = (state = initialState, action: ReduxAction<INotification>) => {
    switch (action.type) {
        case ARCHIVE_ALL_NOTIFICATIONS:
            return {
                items: []
            }
        case ARCHIVE_NOTIFICATION:
            return {
                items: state.items.filter((item: INotification) => {
                    return item.id !== action.payload.id
                })
            }
        case FETCH_NOTIFICATIONS:
            return {
                items: action.payload
            }
        case MARK_ALL_NOTIFICATIONS_READ:
            return {
                items: state.items.map((item: INotification) => {
                    return { ...item, read: true }
                })
            }
        case MARK_NOTIFICATION_READ:
            return {
                items: state.items.map((item: INotification) => {
                    return item.id === action.payload.id ?  { ...item, read: true } : item
                })
            }
        case MARK_NOTIFICATION_UNREAD:
            return {
                items: state.items.map((item: INotification) => {
                    return item.id === action.payload.id ?  { ...item, read: false } : item
                })
            }
        case UNARCHIVE_NOTIFICATION:
            return state
        default:
            return state
    }
}
