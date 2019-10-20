export interface IReport {
    id?: number
    name: string
}

export type ReportVariant =
    | 'teacher-distribution'
    | 'student-attendance'

export type ReportGroup = 
    | 'staff'
    | 'students'

export interface IReportGroup {
    group: ReportGroup
    name: string
}

export interface IReportType {
    name: string
    variant: ReportVariant
    group: ReportGroup
    description: string
}
