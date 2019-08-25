import { IStaff } from './staff'
import { IStudent } from './student'
import { TopicColor } from '../theme'

export interface IBlock {
    id: number
    flex: boolean
    label: string
}

export interface IBlockSchedule extends IBlock {
    day_of_week: number
    start: string
    end: string
}

export interface IBlockDetails {
    block_id: number
	date: string
	start: string
	end: string
    flex: boolean
    label: string
    pending: boolean
    data: any
}

interface ICalendarDay {
    blocks: ICalendarBlock[]
    date: ICalendarDate
    events: ICalendarEvent[]
}

type ICalendarEvent = any

export type ICalendarBlockVariant = TopicColor
    | 'pending'
    | 'missed'
    | 'attended'
    | 'orange'
    | 'purple'

export interface ICalendarBlock {
    badgeCount: number
    title: string
    details: IBlockDetails
    memo?: string
    variant?: ICalendarBlockVariant
}

interface ICalendarDate {
    full_date: string
    date: number
    day: string
    is_today: boolean
}

export interface ICalendarItemDetails {
    id?: number
    variant: string
    title: string
    time?: string
    memo?: string
    method?: string
}

export interface ICalendarItemAction {
    value: string
    callback: (...params: any) => void
}


export type ICheckInMethod = 'air' | 'manual'

export interface ILedgerEntry {
    id: number
    date: string
    time: string
    staff: IStaff
    student: IStudent
    method: ICheckInMethod
    topic?: ITopic
}

export interface IAppointment {
    id?: number
    memo: string
    staff?: IStaff
    date: string
    block_schedule: IBlockSchedule
    student: IStudent
}

export interface ITopic {
    id: number
    topic: string
    color: string
    deleted: boolean
    staff: IStaff
}

export interface IScheduled extends IStaff {
    topic?: ITopic
}

export interface ICalendarDialogGroup {
    name: string
    key: string
    itemMap: (item?: any, blockDetails?: IBlockDetails) => ICalendarItemDetails
    emptyState: any
    children? (blockDetails?: IBlockDetails): any
    actions?: (item?: any, blockDetails?: IBlockDetails) => ICalendarItemAction[]
}
