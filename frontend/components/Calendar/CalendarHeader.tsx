import { format } from 'date-fns'
import React from 'react'

import {
    Button,
    Icon,
    IconButton,
    Tooltip
} from '@material-ui/core'

import Flexbox from '../Layout/Flexbox'
import CalendarMonthLabel, { ICalendarMonthLabelProps } from './CalendarMonthLabel'

interface ICalendarHeaderProps extends Exclude<ICalendarMonthLabelProps, 'date' | 'onChange'>{
    date: Date
    nextLabel: string
    previousLabel: string
    onChange: (date: Date) => void
    onPrevious: () => void
    onNext: () => void
}

const CalendarHeader = (props: ICalendarHeaderProps) => {
    const { date, nextLabel, previousLabel, onChange, onPrevious, onNext, ...rest } = props
    const today: Date = new Date()
    return (
        <Flexbox className='calendar-header'>
            <Tooltip title={format(today, 'MMMM d, yyyy')}>
                <Button variant='outlined' onClick={() => onChange(today)}>Today</Button>
            </Tooltip>
            <Tooltip title={previousLabel}>
                <IconButton onClick={() => onPrevious()}><Icon>chevron_left</Icon></IconButton>
            </Tooltip>
            <Tooltip title={nextLabel}>
                <IconButton onClick={() => onNext()}><Icon>chevron_right</Icon></IconButton>
            </Tooltip>
            <CalendarMonthLabel date={date} onChange={onChange} {...rest} />
        </Flexbox>
    )
}

export default CalendarHeader
