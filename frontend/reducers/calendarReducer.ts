import { FETCH_CALENDAR } from '../actions/types'
import { Calendar } from '../types/calendar'
import { IReduxAction } from '../types/redux'

interface IState {
    calendar: Calendar
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
    }
}
