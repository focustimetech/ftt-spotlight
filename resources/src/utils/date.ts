import {
    DateRange,
    IAbsoluteDateRange,
    IPredefinedDateRange,
    IRelativeDateRange,
    PredefinedDateRange
} from '../types/date'
import { ReportSegment } from '../types/report'
import { subHours, startOfYesterday, endOfToday, endOfYesterday, startOfToday, subDays, endOfWeek, subYears } from 'date-fns'
import { startOfWeek, subWeeks, startOfMonth, subMonths, endOfMonth, startOfYear } from 'date-fns/esm'

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
            let start: Date = new Date()
            let end: Date = new Date()
            switch (dateRange.range) {
                case 'last-hour':
                    start = subHours(new Date(), 1)
                    break
                case 'today':
                    start = startOfToday()
                    end = endOfToday()
                    break
                case 'yesterday':
                    start = startOfYesterday()
                    end = endOfYesterday()
                    break
                case 'last-2-days':
                    start = subDays(startOfToday(), 2)
                    end = endOfYesterday()
                    break
                case 'last-7-days':
                    start = subDays(startOfToday(), 7)
                    end = endOfYesterday()
                    break
                case 'last-14-days':
                    start = subDays(startOfToday(), 14)
                    end = endOfYesterday()
                    break
                case 'last-30-days':
                    start = subDays(startOfToday(), 30)
                    end = endOfYesterday()
                    break
                case 'this-week':
                    start = startOfWeek(startOfToday()),
                    end = endOfYesterday()
                    break
                case 'last-week':
                    start = startOfWeek(subWeeks(startOfToday(), 1))
                    end = endOfWeek(subWeeks(endOfToday(), 1))
                    break
                case 'this-month':
                    start = startOfMonth(startOfToday())
                    end = endOfYesterday()
                    break
                case 'last-month':
                    start = startOfMonth(subMonths(startOfToday(), 1))
                    end = endOfMonth(subMonths(endOfToday(), 1))
                    break
                case 'all-time':
                    start = startOfYear(subYears(startOfToday(), 1))
                    break
            }
            return { type: 'absolute', start, end }
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