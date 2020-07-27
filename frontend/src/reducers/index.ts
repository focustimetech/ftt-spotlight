import { combineReducers } from 'redux'

import { appointmentReducer } from './appointmentReducer'
import { authReducer } from './authReducer'
import { blockReducer } from './blockReducer'
import { calendarReducer } from './calendarReducer'
import { classroomsReducer } from './classroomsReducer'
import { clustersReducer } from './clustersReducer'
import { notificationReducer } from './notificationReducer'
import { reportReducer } from './reportReducer'
import { settingsReducer } from './settingsReducer'
import { snackbarReducer } from './snackbarReducer'
import { staffReducer } from './staffReducer'
import { starReducer } from './starReducer'
import { studentReducer } from './studentReducer'
import { teacherReducer } from './teacherReducer'
import { ticketReducer } from './ticketReducer'
import { topicReducer } from './topicReducer'
import { usersReducer } from './usersReducer'

export const rootReducer = combineReducers({
    appointments: appointmentReducer,
    auth: authReducer,
    blocks: blockReducer,
    calendar: calendarReducer,
    classrooms: classroomsReducer,
    clusters: clustersReducer,
    notifications: notificationReducer,
    settings: settingsReducer,
    snackbars: snackbarReducer,
    staff: staffReducer,
    starred: starReducer,
    students: studentReducer,
    reports: reportReducer,
    teachers: teacherReducer,
    tickets: ticketReducer,
    topics: topicReducer,
    users: usersReducer
})
