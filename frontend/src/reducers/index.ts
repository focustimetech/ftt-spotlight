import { combineReducers } from 'redux'

import { authReducer } from './authReducer'
import { starReducer } from './starReducer'
import { studentReducer } from './studentReducer'
import { studentProfileReducer} from './studentProfileReducer'

export const rootReducer = combineReducers({
    auth: authReducer,
    starred: starReducer,
    students: studentReducer,
    studentProfile: studentProfileReducer
})