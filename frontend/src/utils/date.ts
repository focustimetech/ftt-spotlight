import {
    addDays,
    endOfMonth,
    endOfToday,
    endOfWeek,
    endOfYesterday,
    format,
    getMinutes,
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
 * Returns an array of the dates in the week.
 * @param date The Dates returned being relative to this date.
 * @param weekStartsOn The first day of the week, Sunday (0) being the default.
 * @param daysPerWeek The number of days per week, 7 by default.
 */
export const getDatesOfWeek = (date: Date, weekStartsOn: DayOfWeekNumber = 0, daysPerWeek: number = 7): Date[] => {
    const weekStart: Date = startOfWeek(date, { weekStartsOn })
    const dates: Date[] = [weekStart]
    for (let i: number = 1; i < daysPerWeek; i ++) {
        dates.push(addDays(weekStart, i))
    }
    return dates
}

export const getHoursOfDay = (is24Hour: boolean = false): string[] => {
    const hours: string[] = []
    const lastHour: number = is24Hour ? 24 : 18
    for (let i: number = is24Hour ? 0 : 6; i < lastHour; i ++) {
        hours.push(`${i % 12 || 12} ${i > 11 ? 'PM' : 'AM'}`)
    }

    return hours
}

/**
 * Returns a string representing the time range, useful for labeling calendar blocks.
 * e.g.: ['9am', 5pm'], ['1:30', '3pm'], ['9:05am', '12:35pm']
 * @param start The start Date.
 * @param end The end Date.
 * @return An array containing the time range labels.
 */
export const getTimeRangeLabels = (start: Date, end: Date): [string, string] => {
    const startPeriod = format(start, 'a').toLowerCase()
    const endPeriod = format(end, 'a').toLowerCase()
    const startLabel: string = format(start, getMinutes(start) === 0 ? 'h' : 'h:mm')
    const endLabel: string = format(end, getMinutes(end) === 0 ? 'h' : 'h:mm')
    return [
        `${startLabel}${startPeriod !== endPeriod ? startPeriod : ''}`,
        `${endLabel}${endPeriod}`
    ]
}

/**
 * Formats a date so it can be used as a key to retrieve data from a
 * calendar-like object.
 * @param date The given date.
 * @return The date formatted as an `ICalendar` object key.
 */
export const getCalendarDateKey = (date?: Date): string => {
    return format(date || new Date(), 'yyyy-MM-dd')
}
