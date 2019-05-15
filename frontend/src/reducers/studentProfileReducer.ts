import { FETCH_STUDENT_PROFILE } from '../actions/types'

export interface IState {
    student: any
}

const initialState: IState = {
    student: {}
}

interface IAction {
    type: string,
    payload: any
}

export const studentProfileReducer = (state: IState = initialState, action: IAction) => {
    switch (action.type) {
        case FETCH_STUDENT_PROFILE:
            return {
                student: action.payload
            }
        default:
            return state
    }
}