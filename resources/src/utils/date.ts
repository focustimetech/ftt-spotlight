import {
    DateRange,
    IAbsoluteDateRange,
    IPredefinedDateRange,
    IRelativeDateRange,
    PredefinedDateRange
} from '../types/date'
import { ReportSegment } from '../types/report'

export const DATE_SEGMENT_LABELS: Record<ReportSegment, string[]> = {
    'block': ['Block', 'Blocks'],
    'day': ['Day', 'Days'],
    'week': ['Week', 'Weeks'],
    'month': ['Month', 'Months'],
}

export const PREDEFINED_LABELS: Record<PredefinedDateRange, string> = {
    'all-time': 'All Time',
    'last-14-days': 'Last 14 Days',
    'last-2-days': 'Last 2 Days',
    'last-24-hours': 'Last 24 Hours',
    'last-30-days': 'Last 30 Days',
    'last-7-days': 'Last 7 Days',
    'last-hour': 'Last Hour',
    'last-month': 'Last Month',
    'last-week': 'Last Week',
    'this-month': 'This Month',
    'this-week': 'This Week',
    'today': 'Today',
    'yesterday': 'Yesterday'
}

export const normalizeDateRange = (dateRange: DateRange): IAbsoluteDateRange => {
    const normalizedDateRange: IAbsoluteDateRange = { type: 'absolute', start: new Date(), end: new Date()}
    switch(dateRange.type) {
        case 'absolute':
            return dateRange
        case 'relative':
            return normalizedDateRange
        case 'predefined':
            return normalizedDateRange
    }
}

export const dateRangeToString = (dateRange: DateRange): string => {
    switch(dateRange.type) {
        case 'absolute':
            return `${formatDate(dateRange.start)} - ${formatDate(dateRange.end)}`
        case 'relative':
            const dateSegmentLabel: string[] = DATE_SEGMENT_LABELS[dateRange.segment]
            return `Past ${dateRange.value} ${dateSegmentLabel[dateRange.value === 1 ? 0 : 1]}`
        case 'predefined':
            return PREDEFINED_LABELS[dateRange.range]
    }
}

export const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options)
}