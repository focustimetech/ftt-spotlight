import { FETCH_STUDENTS, NEW_STUDENT, DELETE_STUDENT, UPDATE_STUDENT } from '../actions/types'
import { IStudent } from '../types/student'
import { ReduxAction } from '../types/app'

interface IState {
    items: IStudent[],
    item: IStudent
}

const initialState: IState = {
    items: [],
    item: null
}

export const studentReducer = (state = initialState, action: ReduxAction<IStudent>) => {
    switch (action.type) {
        case FETCH_STUDENTS:
            return {
                ...state,
                items: action.payload
            }
        case NEW_STUDENT:
            return {
                items: [...state.items, action.payload],
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
