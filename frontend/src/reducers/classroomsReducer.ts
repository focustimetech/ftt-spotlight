import {
    DELETE_CLASSROOM,
    FETCH_CLASSROOMS,
    NEW_CLASSROOM,
    UPDATE_CLASSROOM
} from '../actions/types'
import { IClassroom } from '../types/classroom'
import { IReduxAction } from '../types/redux'

interface IState {
    item: IClassroom
    items: IClassroom[]
}

const initialState: IState = {
    item: null,
    items: []
}

export const classroomsReducer = (state = initialState, action: IReduxAction) => {
    switch (action.type) {
        case FETCH_CLASSROOMS:
            return {
                ...state,
                items: action.payload
            }
        case NEW_CLASSROOM:
            return {
                ...state,
                item: action.payload,
                items: [action.payload, ...state.items]
            }
        default:
            return state
    }
}
