import { FETCH_STUDENTS, NEW_STUDENT, DELETE_STUDENT, UPDATE_STUDENT } from '../actions/types'

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
    payload: any
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
        case DELETE_STUDENT:
            return {
                ...state,
                items: state.items.filter((item: any) => item.id !== action.payload)
            }
        case UPDATE_STUDENT:
            return {
                ...state,
                items: [
                    ...state.items.filter((item: any) => item.id !== action.payload.id),
                    action.payload
                ]
            }
        default:
            return state
    }
}
