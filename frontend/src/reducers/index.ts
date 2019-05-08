import { combineReducers } from 'redux'

import { studentReducer } from './studentReducer'

export const rootReducer = combineReducers({
    students: studentReducer
})