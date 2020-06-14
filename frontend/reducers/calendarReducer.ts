import { FETCH_CALENDAR, NEW_TOPIC_SCHEDULE, UPDATE_LEDGER_BUFFER } from '../actions/types'
import { ICalendar, ICalendarEvent, ICalendarEventContext } from '../types/calendar'
import { IReduxAction } from '../types/redux'
import { ITopicSchedule } from '../types/topic'
import { INewLedgerChip } from '../types/checkin'

interface IState {
    calendar: ICalendar
}

const initialState: IState = {
    calendar: {}
}

export const calendarReducer = (state = initialState, action: IReduxAction) => {
    const context: ICalendarEventContext = {}
    switch (action.type) {
        case FETCH_CALENDAR:
            return {
                ...state,
                calendar: { ...state.calendar, ...action.payload }
            }
        case NEW_TOPIC_SCHEDULE:
            const topicSchedule: ITopicSchedule = action.payload
            context.topic = topicSchedule.topic
            break
        case UPDATE_LEDGER_BUFFER:
            const ledgerChip: INewLedgerChip = action.payload
            context.ledgerBuffer = ledgerChip.buffer
            break
        default:
            return state
    }

    const { date, blockId } = action.payload
    console.log('action.payload:', action.payload)
    console.log('state.calendar:', state.calendar)

    const calendarData: ICalendarEvent[] = [...state.calendar[date]]
    const calendarIndex: number = state.calendar[date].findIndex((event: ICalendarEvent) => {
        return event.id === blockId
    })
    console.log('calendarIndex:', calendarIndex)
    const calendarContext: ICalendarEventContext = { ...calendarData[calendarIndex].context }

    if (context.topic) {
        calendarContext.topic = context.topic
    }
    if (context.ledgerBuffer) {
        calendarContext.ledgerBuffer = { ...calendarContext.ledgerBuffer, ...context.ledgerBuffer } 
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
}
