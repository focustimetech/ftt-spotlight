import { combineReducers } from 'redux'

import { authReducer } from './authReducer'
import { settingsReducer } from './settingsReducer'
import { starReducer } from './starReducer'
import { studentReducer } from './studentReducer'
import { studentProfileReducer} from './studentProfileReducer'
import { studentScheduleReducer } from './studentScheduleReducer'

export const rootReducer = combineReducers({
    auth: authReducer,
    settings: settingsReducer,
    starred: starReducer,
    students: studentReducer,
    studentProfile: studentProfileReducer,
    studentSchedule: studentScheduleReducer
})