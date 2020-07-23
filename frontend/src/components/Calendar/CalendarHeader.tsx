import { addDays, addWeeks, format, subDays, subWeeks } from 'date-fns'
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

    const isWeekly: boolean = variant === 'week'
    const today: Date = new Date()

    const onPreviousFallback = () => {
        onChange(variant === 'day' ? getPreviousDate(date) : getPreviousWeek(date))
    }

    const onNextFallback = () => {
        onChange(variant === 'day' ? getNextDate(date) : getNextWeek(date))
    }

    /**
     * @TODO Finish this method.
     * @param date 
     * @param variant 
     */
    const populateCalendar = (date: Date, variant: 'day' | 'week') => {
        /*
        const { currentUser } = props
        const key: string = getCalendarDateKey(date)
        if (editable) {
            // Fetch the current user's calendar.
            // Appending to already defined calendar keys is handled by redycer.
            props.fetchCalendar(date)
        } else {
            // Fetch the given teacher's calendar
            fetchTeacherCalendar(teacher.id, date).then((res: AxiosResponse<ICalendar>) => {
                // Append results to calendar
                this.setState((state: ITeacherProfileState) => ({
                    calendar: { ...state.calendar, ...res.data }
                }))
            })
        }
        */
    }

    const handleNext = () => {
        // const nextWeek: Date = getNextWeek(date)
        // this.populateCalendar(nextWeek)
        const next: Date = variant === 'day' ? getNextDate(date) : getNextWeek(date)
        if (onNext) {
            onNext()
        } else {
            onChange(next)
        }
        if (updateCalendar) {
            populateCalendar(next, variant)
        }
    }

    const handlePrevious = () => {
        // const previousWeek: Date = getPreviousWeek(date)
        // this.populateCalendar(previousWeek)
        const previous: Date = variant === 'day' ? getPreviousDate(date) : getPreviousWeek(date)
        if (onPrevious) {
            onPrevious()
        } else {
            onChange(previous)
        }
        if (props.updateCalendar) {
            populateCalendar(previous, variant)
        }
    }

    return (
        <Flexbox className='calendar-header'>
            <Tooltip title={format(today, 'MMMM d, yyyy')}>
                <Button variant='outlined' onClick={() => onChange(today)}>Today</Button>
            </Tooltip>
            <Tooltip title={previousLabel || (isWeekly ? 'Next week' : 'Next day')}>
                <IconButton onClick={() => handlePrevious()}><Icon>chevron_left</Icon></IconButton>
            </Tooltip>
            <Tooltip title={nextLabel || (isWeekly ? 'Previous week' : 'Previous day')}>
                <IconButton onClick={() => handleNext()}><Icon>chevron_right</Icon></IconButton>
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

const mapStateToProps = (state: any) => ({
    currentUser: state.auth.user
})

const mapDispatchToProps = { fetchCalendar }

export default connect(mapStateToProps, mapDispatchToProps)(CalendarHeader)
