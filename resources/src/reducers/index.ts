import { combineReducers } from 'redux'

import { authReducer } from './authReducer'
import { checkinReducer } from './checkinReducer'
import { settingsReducer } from './settingsReducer'
import { starReducer } from './starReducer'
import { staffReducer } from './staffReducer'
import { staffScheduleReducer } from './staffScheduleReducer'
import { studentReducer } from './studentReducer'
import { studentProfileReducer} from './studentProfileReducer'
import { studentScheduleReducer } from './studentScheduleReducer'
import { notificationReducer } from './notificationReducer'
import { staffProfileReducer } from './staffProfileReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    settings: settingsReducer,
    starred: starReducer,
    students: studentReducer,
    staff: staffReducer,
    staffProfile: staffProfileReducer,
    staffSchedule: staffScheduleReducer,
    studentProfile: studentProfileReducer,
    studentSchedule: studentScheduleReducer,
    notifications: notificationReducer,
    checkin: checkinReducer
})
