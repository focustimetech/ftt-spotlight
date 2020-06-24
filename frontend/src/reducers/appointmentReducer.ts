import { DELETE_APPOINTMENT, FETCH_APPOINTMENTS, NEW_APPOINTMENT } from '../actions/types'
import { IAppointment } from '../types/appointment'
import { IReduxAction } from '../types/redux'

interface IState {
    items: IAppointment[]
    item: IAppointment
}

const initialState: IState = {
    items: [],
    item: null
}

export const appointmentReducer = (state = initialState, action: IReduxAction<IAppointment>) => {
    switch (action.type) {
        case FETCH_APPOINTMENTS:
            return {
                ...state,
                items: action.payload
            }
        case NEW_APPOINTMENT:
            return {
                ...state,
                item: action.payload,
                items: [...state.items, action.payload]
            }
        case DELETE_APPOINTMENT:
            const deleted: number = state.items.findIndex((item: IAppointment) => item.id === action.payload.id)
            return {
                ...state,
                item: state.items[deleted],
                items: state.items.splice(deleted, 1)
            }
        default:
            return state
    }
}
