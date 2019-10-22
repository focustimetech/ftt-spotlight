export interface IReport {
    id?: number
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

export type PredefinedDateRange =
    | 'last-hour'
    | 'last-24-hours'
    | 'yesterday'
    | 'today'
    | 'last-2-days'
    | 'last-7-days'
    | 'last-14-days'
    | 'last-30-days'
    | 'this-week'
    | 'last-week'
    | 'this-month'
    | 'last-month'
    | 'all-time'

export type ReportingState = 'idle' | 'running' | 'errored'

export interface IAbsoluteDateRange {
    type: 'absolute'
    start: Date
    end: Date
}

export interface IRelativeDateRange {
    type: 'relative'
    value: number
    segment: ReportSegment
}

export interface IPredefinedDateRange {
    type: 'predefined'
    range: PredefinedDateRange
}

export type DateRange = IAbsoluteDateRange | IRelativeDateRange | IPredefinedDateRange

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

export interface TeacherDistributionReport extends IReport {
    variant: 'teacher-distribution'
    includeUnattended: boolean
}

export interface StudentAttendanceReport extends IReport {
    variant: 'student-attendance'
    showAsPercentage: boolean
}

export type Report = { variant: ReportVariant } & (
    | TeacherDistributionReport
    | StudentAttendanceReport
)
