export type ICalendar = Record<string, ICalendarDay>

export interface ICalendarDay {
    events: ICalendarFullDayEvent[]
    blocks: ICalendarEvent[]
}

export interface ICalendarFullDayEvent {
    title: string
    description: string
    color: string
    onClick: () => void
}

export interface ICalendarEvent extends ICalendarFullDayEvent {
    startTime: string
    endTime: string
    label: string
}
