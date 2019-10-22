import { DateRange } from './date'

export interface IReport {
    // id?: number
    name: string
    dateRange: DateRange
    segment: ReportSegment
    access: 'public' | 'private'
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

export interface TeacherDistributionReport {
    variant: 'teacher-distribution'
    includeUnattended: boolean
}

export interface StudentAttendanceReport {
    variant: 'student-attendance'
    showAsPercentage: boolean
}

export type Report = { variant: ReportVariant, [key: string]: any } & IReport & (
    | TeacherDistributionReport
    | StudentAttendanceReport
)
