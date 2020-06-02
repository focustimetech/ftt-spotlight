import { FETCH_CALENDAR, NEW_TOPIC_SCHEDULE } from '../actions/types'
import { ICalendar, ICalendarEvent } from '../types/calendar'
import { IReduxAction } from '../types/redux'
import { ITopicSchedule } from '../types/topic'

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
        case NEW_TOPIC_SCHEDULE:
            const topicSchedule: ITopicSchedule = action.payload
            const { topic, blockId, date } = topicSchedule
            const calendarData: ICalendarEvent[] = [...state.calendar[date]]
            const calendarIndex: number = state.calendar[date].findIndex((event: ICalendarEvent) => {
                return event.id === topicSchedule.blockId
            })

            calendarData[calendarIndex] = {
                ...state.calendar[date][calendarIndex],
                context: { ...state.calendar[date][calendarIndex].context, topic }
            }
            return {
                ...state,
                calendar: {
                    ...state.calendar,
                    [topicSchedule.date]: calendarData
                }
            }
        default:
            return state
    }
}
