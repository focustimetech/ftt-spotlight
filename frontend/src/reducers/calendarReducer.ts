import { FETCH_CALENDAR, UPDATE_CALENDAR_CONTEXT } from '../actions/types'
import { ICalendar, ICalendarEvent, ICalendarEventContext, INewCalendarContext } from '../types/calendar'
import { IReduxAction } from '../types/redux'

interface IState {
    calendar: ICalendar
}

type CalendarReducerAction =
    | IReduxAction<'FETCH_CALENDAR', ICalendar>
    | IReduxAction<'UPDATE_CALENDAR_CONTEXT', INewCalendarContext>

const initialState: IState = {
    calendar: {}
}

export const calendarReducer = (state = initialState, action: CalendarReducerAction) => {
    switch (action.type) {
        case FETCH_CALENDAR:
            return {
                ...state,
                calendar: { ...state.calendar, ...action.payload }
            }
        case UPDATE_CALENDAR_CONTEXT:
            const { date, blockId } = action.payload
            const newContext: ICalendarEventContext = action.payload.context
            const calendarData: ICalendarEvent[] = [...state.calendar[date]]
            const calendarIndex: number = state.calendar[date].findIndex((event: ICalendarEvent) => {
                return event.id === blockId
            })
            if (calendarIndex === -1) {
                console.log('calendarIndex === -1.')
                return
            }
            const calendarContext: ICalendarEventContext = { ...calendarData[calendarIndex].context }

            if (newContext.topic) {
                calendarContext.topic = newContext.topic
            }
            console.log('calendarContext.ledgerEntries:', calendarContext.ledgerEntries)
            if (newContext.ledgerEntries) {
                calendarContext.ledgerEntries = calendarContext.ledgerEntries
                    ? [...calendarContext.ledgerEntries, ...newContext.ledgerEntries]
                    : newContext.ledgerEntries
            }

            calendarData[calendarIndex] = {
                ...state.calendar[date][calendarIndex],
                context: calendarContext
            }
            return {
                ...state,
                calendar: {
                    ...state.calendar,
                    [date]: calendarData
                }
            }
        default:
            return state
    }
}
