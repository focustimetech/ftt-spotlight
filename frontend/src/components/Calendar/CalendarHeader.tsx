import { addDays, addWeeks, format, subDays, subWeeks, startOfWeek } from 'date-fns'
import React from 'react'
import { connect } from 'react-redux'

import {
    Button,
    Icon,
    IconButton,
    Tooltip
} from '@material-ui/core'

import Flexbox from '../Layout/Flexbox'
import CalendarMonthLabel, { ICalendarMonthLabelProps } from './CalendarMonthLabel'

import { fetchCalendar } from '../../actions/calendarActions'
import { IUser } from '../../types/auth'

interface IReduxProps {
    currentUser: IUser
    fetchCalendar: (date: Date) => Promise<any>
}

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
    updateCalendar?: boolean
    onChange: (date: Date) => void
    onPrevious?: () => void
    onNext?: () => void
    onRefresh?: () => void
}

const CalendarHeader = (props: ICalendarHeaderProps & IReduxProps) => {
    const {
        date,
        days,
        nextLabel,
        previousLabel,
        variant,
        updateCalendar,
        onChange,
        onPrevious,
        onNext,
        onRefresh,
        ...rest
    } = props

    React.useEffect(() => {
        const next: Date = variant === 'day' ? getNextDate(date) : getNextWeek(date)
        const previous: Date = variant === 'day' ? getPreviousDate(date) : getPreviousWeek(date)
        // populateCalendar(date) // Not needed
        populateCalendar(next)
        populateCalendar(previous)
    }, [])

    const isWeekly: boolean = variant === 'week'
    const today: Date = new Date()

    const populateCalendar = (d: Date) => {
        props.fetchCalendar(variant === 'day' ? d : startOfWeek(d))
    }

    const handleChange = (newDate: Date) => {
        if (updateCalendar) {
            populateCalendar(variant === 'day' ? newDate : startOfWeek(newDate))
        }
        onChange(newDate)
    }

    const handleNext = () => {
        const next: Date = variant === 'day' ? getNextDate(date) : getNextWeek(date)
        if (onNext) {
            onNext()
        } else {
            onChange(next)
        }
        if (updateCalendar) {
            populateCalendar(variant === 'day' ? getNextDate(next) : getNextWeek(next))
        }
    }

    const handlePrevious = () => {
        const previous: Date = variant === 'day' ? getPreviousDate(date) : getPreviousWeek(date)
        if (onPrevious) {
            onPrevious()
        } else {
            onChange(previous)
        }
        if (props.updateCalendar) {
            populateCalendar(variant === 'day' ? getPreviousDate(previous) : getPreviousWeek(previous))
        }
    }

    return (
        <Flexbox className='calendar-header'>
            <Tooltip title={format(today, 'MMMM d, yyyy')}>
                <Button variant='outlined' onClick={() => handleChange(today)}>Today</Button>
            </Tooltip>
            <Tooltip title={previousLabel || (isWeekly ? 'Next week' : 'Next day')}>
                <IconButton onClick={() => handlePrevious()}><Icon>chevron_left</Icon></IconButton>
            </Tooltip>
            <Tooltip title={nextLabel || (isWeekly ? 'Previous week' : 'Previous day')}>
                <IconButton onClick={() => handleNext()}><Icon>chevron_right</Icon></IconButton>
            </Tooltip>
            <CalendarMonthLabel date={date} onChange={handleChange} includeDay={!isWeekly} days={isWeekly ? 7 : 1} {...rest} />
            {onRefresh && (
                <Tooltip title='Refresh'>
                    <IconButton onClick={() => onRefresh()}><Icon>refresh</Icon></IconButton>
                </Tooltip>
            )}
        </Flexbox>
    )
}

const mapStateToProps = (state: any) => ({
    currentUser: state.auth.user
})

const mapDispatchToProps = { fetchCalendar }

export default connect(mapStateToProps, mapDispatchToProps)(CalendarHeader)
