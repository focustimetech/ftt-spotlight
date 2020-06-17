import { DELETE_STUDENT, FETCH_STUDENTS, NEW_STUDENT, UPDATE_STUDENT } from '../actions/types'
import { ReduxAction } from '../types'
import { IStudent } from '../types/auth'

interface IState {
    students: Record<number, IStudent>,
    item: IStudent
}

const initialState: IState = {
    students: {},
    item: null
}

export const studentReducer = (state = initialState, action: ReduxAction<IStudent[]>) => {
    switch (action.type) {
        case FETCH_STUDENTS:
            return {
                ...state,
                students: action.payload.reduce((record: Record<number, IStudent>, student: IStudent) => {
                    record[student.accountId] = student
                    return record
                }, {})
            }
        /*
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
        */
        default:
            return state
    }
}
