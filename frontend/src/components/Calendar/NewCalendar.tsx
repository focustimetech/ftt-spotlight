import React from 'react'

import { startOfWeek, addDays } from 'date-fns'

import {
    Button,
    ButtonBase,
    Icon,
    IconButton,
    Typography
} from '@material-ui/core'

import { getDaysOfWeek } from '../../utils/date'

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

interface IProps {
    calendar: Record<string, ICalendarDay>
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
}

interface IState {
    currentDate: Date
}

class Calendar extends React.Component<IProps, IState> {
    state: IState = {
        currentDate: new Date()
    }

    handleNext = () => {
        this.setState((state: IState) => ({
            currentDate: state.currentDate
        }))
    }

    handlePrevious = () => {
        this.setState((state: IState) => ({
            currentDate: state.currentDate
        }))
    }

    render() {
        const { currentDate } = this.state
        const { weekStartsOn, calendar } = this.props
        const weekStart: Date = startOfWeek(this.state.currentDate, { weekStartsOn })
        const daysOfWeek: string[] = getDaysOfWeek(weekStartsOn)
        const currentMonth: string = 'Month'
        const currentYear: number = 2020

        return (
            <div className='new-calendar'>
                <div className='new-calendar__header'>
                    <Typography variant='h5'>{currentMonth} {currentYear}</Typography>
                    <Button variant='outlined'>Today</Button>
                    <IconButton onClick={() => this.handlePrevious()}><Icon>left_chevron</Icon></IconButton>
                    <IconButton onClick={() => this.handleNext()}><Icon>right_chevron</Icon></IconButton>
                </div>
                <div className='new-calendar__body'>
                    {daysOfWeek.map((dayOfWeek: string, index: number) => {
                        return (
                            <>
                                <div>{dayOfWeek}</div>
                                <div>{addDays(weekStart, index).getDate()}</div>
                            </>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Calendar
