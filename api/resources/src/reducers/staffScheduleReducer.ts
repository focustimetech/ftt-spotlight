import { FETCH_STAFF_SCHEDULE } from '../actions/types'

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

export const staffScheduleReducer = (state: IState = initialState, action: IAction) => {
    switch (action.type) {
        case FETCH_STAFF_SCHEDULE:
            return {
                ...state,
                schedule: action.payload
            }
        default:
            return state
    }
}
