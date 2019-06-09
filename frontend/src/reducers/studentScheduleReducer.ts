import { FETCH_STUDENT_SCHEDULE } from '../actions/types'

export interface IState {
    schedule: any
}

const initialState: IState = {
    schedule: {}
}

interface IAction {
    type: string,
    payload: any
}

export const studentScheduleReducer = (state: IState = initialState, action: IAction) => {
    switch (action.type) {
        case FETCH_STUDENT_SCHEDULE:
            return {
                schedule: action.payload
            }
        default:
            return state
    }
}
