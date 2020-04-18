import React from 'react'

import {
    addDays,
    addWeeks,
    endOfWeek,
    startOfWeek,
    subDays,
    subWeeks
} from 'date-fns'

import {
    Button,
    ButtonBase,
    Icon,
    IconButton,
    Typography
} from '@material-ui/core'

import { getDaysOfWeek } from '../../utils/date'

import Flexbox from '../Layout/Flexbox'
import CalendarMonthLabel from './CalendarMonthLabel'

interface ICalendarDay {
    weekDay: string
    dayOfMonth: number
    events: ICalendarFullDayEvent[]
}

interface ICalendarFullDayEvent {
    title: string
    description: string
    color: string
    onClick: () => void
}

interface ICalendarEvent extends ICalendarFullDayEvent {
    startTime: string
    endTime: string
}

interface ICalendarProps {
    calendar: Record<string, ICalendarDay>
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
}

interface IState {
    currentDate: Date
}

class Calendar extends React.Component<ICalendarProps, IState> {
    state: IState = {
        currentDate: new Date()
    }

    handleNext = () => {
        this.setState((state: IState) => ({
            currentDate: startOfWeek(addDays(endOfWeek(state.currentDate), 1))
        }))
    }

    handlePrevious = () => {
        this.setState((state: IState) => ({
            currentDate: startOfWeek(subDays(startOfWeek(state.currentDate), 1))
        }))
    }

    render() {
        const { currentDate } = this.state
        const { weekStartsOn, calendar } = this.props
        const weekStart: Date = startOfWeek(currentDate, { weekStartsOn })
        const daysOfWeek: string[] = getDaysOfWeek(weekStartsOn)

        return (
            <div className='new-calendar'>
                <Flexbox padding className='new-calendar__header'>
                    <CalendarMonthLabel date={weekStart} />
                    <Button variant='outlined'>Today</Button>
                    <IconButton onClick={() => this.handlePrevious()}><Icon>alarm</Icon></IconButton>
                    <IconButton onClick={() => this.handleNext()}><Icon>alarm</Icon></IconButton>
                </Flexbox>
                <div className='new-calendar__body'>
                    {daysOfWeek.map((dayOfWeek: string, index: number) => {
                        const date: Date = addDays(weekStart, index)
                        const key: string = date.toISOString().substr(0, 10)
                        console.log('Key = ', key)
                        const data: ICalendarDay = this.props.calendar[key]
                        return (
                            <>
                                <div className />
                                <div>{dayOfWeek}</div>
                                <div>{date.getDate()}</div>
                            </>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Calendar
