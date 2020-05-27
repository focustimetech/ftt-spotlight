import { combineReducers } from 'redux'

import { authReducer } from './authReducer'
import { blockReducer } from './blockReducer'
import { classroomsReducer } from './classroomsReducer'
import { clustersReducer } from './clustersReducer'
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
    blocks: blockReducer,
    classrooms: classroomsReducer,
    clusters: clustersReducer,
    notifications: notificationReducer,
    settings: settingsReducer,
    snackbars: snackbarReducer,
    staff: staffReducer,
    staffProfile: staffProfileReducer,
    starred: starReducer,
    students: studentReducer,
    staffSchedule: staffScheduleReducer,
    studentProfile: studentProfileReducer,
    studentSchedule: studentScheduleReducer,
    reports: reportReducer,
    topics: topicReducer,
    staffTopics: staffTopicsReducer,
    users: usersReducer
})
