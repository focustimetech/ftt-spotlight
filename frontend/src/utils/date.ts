import {
    addDays,
    endOfMonth,
    endOfToday,
    endOfWeek,
    endOfYesterday,
    format,
    startOfMonth,
    startOfToday,
    startOfWeek,
    startOfYear,
    startOfYesterday,
    subDays,
    subHours,
    subMonths,
    subWeeks,
    subYears,
} from 'date-fns'

import {
    DateRange,
    DayOfWeekNumber,
    IAbsoluteDateRange,
    IPredefinedDateRange,
    IRelativeDateRange,
    PredefinedDateRange
} from '../types/date'
import { ReportSegment } from '../types/report'

const ALL_DAYS: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export const DATE_SEGMENT_LABELS: Record<ReportSegment, string[]> = {
    block: ['Block', 'Blocks'],
    day: ['Day', 'Days'],
    week: ['Week', 'Weeks'],
    month: ['Month', 'Months']
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
    switch (dateRange.type) {
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
    switch (dateRange.type) {
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
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
    return date.toLocaleDateString('en-US', options)
}

/**
 * Returns an array of the textual representations of the days of the week, i.e. 'Mon' through 'Sun'
 * @param firstDayOfWeek The first day of the week, Sunday (0) being the default.
 */
export const getDaysOfWeek = (firstDayOfWeek: DayOfWeekNumber = 0): string[] => {
    const days: string[] = [...ALL_DAYS]
    const splice: string[] = days.splice(0, firstDayOfWeek)
    return days.concat(splice)
}

/**
 * Returns a string that represents the month(s) and year relative to the given date.
 * @param date The given Date.
 * @param days The amount of days within the range, which is 7 by default.
 * @return The string representing the year and month, e.g. "January 2020", "Jan - Feb 2020", "Dec 2020 - Jan 2021".
 */
export const getWeekTitle = (date: Date, days: number = 7): string => {
    const end: Date = addDays(date, days)
    if (date.getUTCFullYear() !== end.getUTCFullYear()) {
        return `${format(date, 'MMM yyyy')} - ${format(end, 'MMM yyyy')}`
    } else if (date.getUTCMonth() !== end.getUTCMonth()) {
        return `${format(date, 'MMM')} - ${format(end, 'MMM yyyy')}`
    }
    return format(date, 'MMMM yyyy')
}
