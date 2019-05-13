import { combineReducers } from 'redux'

import { authReducer } from './authReducer'
import { studentReducer } from './studentReducer'

export const rootReducer = combineReducers({
    auth: authReducer,
    students: studentReducer
})