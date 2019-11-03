import { combineReducers } from 'redux'

import { authReducer } from './authReducer'
import { checkinReducer } from './checkinReducer'
import { notificationReducer } from './notificationReducer'
import { reportReducer } from './reportReducer'
import { settingsReducer } from './settingsReducer'
import { snackbarReducer } from './snackbarReducer'
import { staffProfileReducer } from './staffProfileReducer'
import { staffReducer } from './staffReducer'
import { staffScheduleReducer } from './staffScheduleReducer'
import { staffTopicsReducer } from './staffTopicsReducer'
import { starReducer } from './starReducer'
import { studentProfileReducer} from './studentProfileReducer'
import { studentReducer } from './studentReducer'
import { studentScheduleReducer } from './studentScheduleReducer'
import { topicReducer } from './topicReducer'
import { usersReducer } from './usersReducer'

export const rootReducer = combineReducers({
    auth: authReducer,
    reports: reportReducer,
    settings: settingsReducer,
    snackbars: snackbarReducer,
    starred: starReducer,
    students: studentReducer,
    staff: staffReducer,
    staffProfile: staffProfileReducer,
    staffSchedule: staffScheduleReducer,
    studentProfile: studentProfileReducer,
    studentSchedule: studentScheduleReducer,
    notifications: notificationReducer,
    checkin: checkinReducer,
    topics: topicReducer,
    staffTopics: staffTopicsReducer,
    users: usersReducer
})
