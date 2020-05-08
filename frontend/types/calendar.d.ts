import { IClassroom } from './classroom'

export type ICalendar = Record<string, ICalendarDay>

export interface ICalendarDay {
    events: ICalendarFullDayEvent[]
    blocks: ICalendarEvent[]
}

export interface ICalendarFullDayEvent {
    title: string
    color?: string
}

export interface ICalendarEvent extends ICalendarFullDayEvent {
    label: string
    startTime: string
    endTime: string
    location: IClassroom
}

export interface ICalendarEventContext {
    airCheckIns?: number
    appointments?: number
    attended?: boolean
    missedAppointment?: boolean
    ledgerEntries?: number
    plans?: number
    [key: string]: number | boolean
}
