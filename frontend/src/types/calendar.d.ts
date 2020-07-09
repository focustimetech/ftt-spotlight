import { IAppointment } from './appointment'
import { AirCheckIn, ILedgerEntry } from './checkin'
import { IClassroom } from './classroom'
import { IPlan } from './plan'
import { ITopic } from './topic'

export type ICalendar = Record<string, ICalendarEvent[]>

export interface IBlock {
    id: number
    label: string
    weekDay: number
    startTime?: string
    endTime?: string
}

export interface ICalendarEvent extends IBlock {
    context: ICalendarEventContext
}

export interface ICalendarEventContext {
    airCheckIn?: AirCheckIn
    appointments?: IAppointment[]
    attended?: boolean
    ledgerEntries?: ILedgerEntry[]
    location?: IClassroom
    missedAppointment?: boolean
    plans?: IPlan[]
    topic?: ITopic
}

export interface ICalendarContextDetails {
    event: ICalendarEvent
    date: Date
    title: string
    color?: string
}
