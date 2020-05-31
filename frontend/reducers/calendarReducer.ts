import { FETCH_CALENDAR } from '../actions/types'
import { ICalendar } from '../types/calendar'
import { IReduxAction } from '../types/redux'

interface IState {
    calendar: ICalendar
}

const initialState: IState = {
    calendar: {}
}

export const calendarReducer = (state = initialState, action: IReduxAction) => {
    switch (action.type) {
        case FETCH_CALENDAR:
            return {
                ...state,
                calendar: action.payload
            }
        default:
            return state
    }
}
