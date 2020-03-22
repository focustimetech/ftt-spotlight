import { ReportSegment } from './report'

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
