import { combineReducers } from 'redux'

import { authReducer } from './authReducer'
import { starReducer } from './starReducer'
import { studentReducer } from './studentReducer'

export const rootReducer = combineReducers({
    auth: authReducer,
    starred: starReducer,
    students: studentReducer,
})