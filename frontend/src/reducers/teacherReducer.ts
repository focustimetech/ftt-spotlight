import { FETCH_TEACHERS } from '../actions/types'
import { ReduxAction } from '../types'
import { ITeacher } from '../types/auth'

interface IState {
    teachers: Record<number, ITeacher>,
    item: ITeacher
}

const initialState: IState = {
    teachers: {},
    item: null
}

export const teacherReducer = (state = initialState, action: ReduxAction<ITeacher[]>) => {
    switch (action.type) {
        case FETCH_TEACHERS:
            return {
                ...state,
                teachers: action.payload.reduce((record: Record<number, ITeacher>, teacher: ITeacher) => {
                    record[teacher.accountId] = teacher
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
