import { FETCH_STUDENTS, NEW_STUDENT } from '../actions/types'

interface IState {
    items: any[],
    item: any
}

const initialState: IState = {
    items: [],
    item: {}
}

interface IAction {
    type: string,
    payload: any[]
}

export const studentReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case FETCH_STUDENTS:
            return {
                ...state,
                items: action.payload
            }
        case NEW_STUDENT:
            return {
                ...state,
                item: action.payload
            }
        default:
            return state
    }
}
