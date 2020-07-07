import { addDays, addWeeks, format, subDays, subWeeks } from 'date-fns'
import React from 'react'

import {
    Button,
    Icon,
    IconButton,
    Tooltip
} from '@material-ui/core'

import Flexbox from '../Layout/Flexbox'
import CalendarMonthLabel, { ICalendarMonthLabelProps } from './CalendarMonthLabel'

const getNextDate = (date: Date): Date => {
    return addDays(date, 1)
}

const getPreviousDate = (date: Date): Date => {
    return subDays(date, 1)
}

const getNextWeek = (date: Date): Date => {
    return addWeeks(date, 1)
}

const getPreviousWeek = (date: Date): Date => {
    return subWeeks(date, 1)
}

export interface ICalendarHeaderProps extends Exclude<ICalendarMonthLabelProps, 'date' | 'onChange'> {
    date: Date
    variant: 'day' | 'week'
    nextLabel?: string
    previousLabel?: string
    onChange: (date: Date) => void
    onPrevious?: () => void
    onNext?: () => void
    onRefresh?: () => void
}

const CalendarHeader = (props: ICalendarHeaderProps) => {
    const {
        date,
        days,
        nextLabel,
        previousLabel,
        variant,
        onChange,
        onPrevious,
        onNext,
        onRefresh,
        ...rest
    } = props

    const isWeekly: boolean = variant === 'week'
    const today: Date = new Date()

    const onPreviousFallback = () => {
        onChange(variant === 'day' ? getPreviousDate(date) : getPreviousWeek(date))
    }

    const onNextFallback = () => {
        onChange(variant === 'day' ? getNextDate(date) : getNextWeek(date))
    }

    return (
        <Flexbox className='calendar-header'>
            <Tooltip title={format(today, 'MMMM d, yyyy')}>
                <Button variant='outlined' onClick={() => onChange(today)}>Today</Button>
            </Tooltip>
            <Tooltip title={previousLabel || (isWeekly ? 'Next week' : 'Next day')}>
                <IconButton onClick={() => onPrevious ? onPrevious() : onPreviousFallback()}><Icon>chevron_left</Icon></IconButton>
            </Tooltip>
            <Tooltip title={nextLabel || (isWeekly ? 'Previous week' : 'Previous day')}>
                <IconButton onClick={() => onNext ? onNext() : onNextFallback()}><Icon>chevron_right</Icon></IconButton>
            </Tooltip>
            <CalendarMonthLabel date={date} onChange={onChange} includeDay={!isWeekly} days={isWeekly ? 7 : 1} {...rest} />
            {onRefresh && (
                <Tooltip title='Refresh'>
                    <IconButton onClick={() => onRefresh()}><Icon>refresh</Icon></IconButton>
                </Tooltip>
            )}
        </Flexbox>
    )
}

export default CalendarHeader
