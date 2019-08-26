import { FETCH_STAFF_PROFILE } from '../actions/types'

export interface IState {
    staff: any
}

const initialState: IState = {
    staff: {}
}

interface IAction {
    type: string,
    payload: any
}

export const staffProfileReducer = (state: IState = initialState, action: IAction) => {
    switch (action.type) {
        case FETCH_STAFF_PROFILE:
            return {
                ...state,
                staff: action.payload
            }
        default:
            return state
    }
}
