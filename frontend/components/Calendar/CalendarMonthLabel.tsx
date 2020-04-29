import React from 'react'

import { addDays, format } from 'date-fns'
import moment from 'moment'

import { Typography } from '@material-ui/core'

interface ICalendarMonthLabelProps {
    date: Date
    days?: number
}

const CalendarMonthLabel = (props: ICalendarMonthLabelProps) => {
    const days: number = props.days ? props.days - 1 : 6
    const date: Date = moment(props.date).toDate()
    const end: Date = addDays(date, days)
    let label: JSX.Element
    if (date.getUTCFullYear() !== end.getUTCFullYear()) {
        label = <>
            <span className='calendar-month-label__month'>{format(date, 'MMMM')}</span> {format(date, 'yyyy')} – <span className='calendar-month-label__month'>{format(end, 'MMMM')}</span> {format(end, 'yyyy')}
        </>
    } else if (date.getUTCMonth() !== end.getUTCMonth()) {
        label = <>
            <span className='calendar-month-label__month'>{format(date, 'MMMM')}</span> – <span className='calendar-month-label__month'>{format(end, 'MMMM')}</span> {format(date, 'yyyy')}
        </>
    } else {
        label = <>
            <span className='calendar-month-label__month'>{format(date, 'MMMM')}</span> {format(date, 'yyyy')}
        </>
    }

    return (
        <Typography className='calendar-month-label' variant='h5'>{label}</Typography>
    )
}

export default CalendarMonthLabel
