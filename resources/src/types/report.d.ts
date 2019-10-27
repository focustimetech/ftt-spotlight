import { DateRange } from './date'

export interface IReport {
    name: string
    date_range: DateRange
    segment: ReportSegment
    access: 'public' | 'private'
    id?: number
    date_created: string
}

export type ReportSegment = 
    | 'block'
    | 'day'
    | 'week'
    | 'month'

export type ReportingState = 'idle' | 'running' | 'errored'

export type ReportGroup = 
    | 'staff'
    | 'students'

export interface IReportGroupInfo {
    group: ReportGroup
    name: string
}

export interface IReportVariantInfo {
    name: string
    variant: ReportVariant
    group: ReportGroup
    description: string
}

export type ReportVariant =
    | 'teacher-distribution'
    | 'student-attendance'

export interface Report extends IReport {
    variant: ReportVariant
    [key: string]: any
}
