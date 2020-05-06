import DateFnsUtils from '@date-io/date-fns'
import moment from 'moment'
import React from 'react'

import {
    addDays,
    addWeeks,
    endOfWeek,
    isToday,
    startOfWeek,
    
    subDays,
    subWeeks,
    getMinutes
} from 'date-fns'

import {
    Button,
    ButtonBase,
    Icon,
    IconButton,
    Typography
} from '@material-ui/core'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

import { getDaysOfWeek, getHoursOfDay, getTimeRangeLabels } from '../../utils/date'

import Flexbox from '../Layout/Flexbox'
import CalendarMonthLabel from './CalendarMonthLabel'
import CalendarBlock from './NewCalendarBlock'

export type ICalendar = Record<string, ICalendarDay>

interface ICalendarDay {
    events: ICalendarFullDayEvent[]
    blocks: ICalendarEvent[]
}

interface ICalendarFullDayEvent {
    title: string
    description: string
    color: string
    onClick: () => void
}

export interface ICalendarEvent extends ICalendarFullDayEvent {
    startTime: string
    endTime: string
    label: string
}

interface ICalendarProps {
    calendar: ICalendar
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
}

interface ICalendarState {
    currentDate: Date
    pickerRef: EventTarget & HTMLButtonElement
}

class Calendar extends React.Component<ICalendarProps, ICalendarState> {
    state: ICalendarState = {
        currentDate: new Date(),
        pickerRef: null
    }

    handleSetToday = () => {
        this.setState({ currentDate: new Date()})
    }

    handleNext = () => {
        this.setState((state: ICalendarState) => ({
            currentDate: startOfWeek(addDays(endOfWeek(state.currentDate), 1))
        }))
    }

    handlePrevious = () => {
        this.setState((state: ICalendarState) => ({
            currentDate: startOfWeek(subDays(startOfWeek(state.currentDate), 1))
        }))
    }

    handleOpenPicker = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.setState({ pickerRef: event.currentTarget })
    }

    handleClosePicker = () => {
        this.setState({ pickerRef: null })
    }

    handleSelectDate = (date: Date) => {
        this.setState({ currentDate: date, pickerRef: null })
    }

    render() {
        const { currentDate } = this.state
        const { weekStartsOn, calendar } = this.props
        const weekStart: Date = startOfWeek(currentDate, { weekStartsOn })
        const daysOfWeek: string[] = getDaysOfWeek(weekStartsOn)
        const hoursOfDay = getHoursOfDay()
        const calendarDayKeys: string[] = []
        const pickerOpen: boolean = Boolean(this.state.pickerRef)

        return (
            <div className='new-calendar'>
                <Flexbox padding className='new-calendar__header'>
                    <Button variant='outlined' onClick={() => this.handleSetToday()}>Today</Button>
                    <IconButton onClick={() => this.handlePrevious()}><Icon>chevron_left</Icon></IconButton>
                    <IconButton onClick={() => this.handleNext()}><Icon>chevron_right</Icon></IconButton>
                    <CalendarMonthLabel date={weekStart} />
                    <div>
                        <IconButton onClick={this.handleOpenPicker}><Icon>today</Icon></IconButton>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                value={this.state.currentDate}
                                onChange={this.handleSelectDate}
                                onClose={this.handleClosePicker}
                                disableToolbar
                                variant='inline'
                                open={pickerOpen}
                                TextFieldComponent={() => null}
                                PopoverProps={{anchorEl: this.state.pickerRef }}
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                </Flexbox>
                <div className='new-calendar__body'>
                    <div className='new-calendar__date-labels'>
                        {daysOfWeek.map((dayOfWeek: string, index: number) => {
                            const date: Date = addDays(weekStart, index)
                            const dateIsToday: boolean = isToday(date)
                            const key: string = date.toISOString().substr(0, 10)
                            calendarDayKeys.push(key)

                            return (
                                <div className='new-calendar__date-label'>
                                    <Typography variant='overline' className='date-label-day' color={dateIsToday ? 'primary' : undefined}>
                                        {dateIsToday ? 'Today' : dayOfWeek}
                                    </Typography>
                                    <Typography variant='h6' className='date-label-date' color={dateIsToday ? 'primary' : undefined}>
                                        {date.getDate()}
                                    </Typography>
                                </div>
                            )
                        })}
                    </div>
                    <div className='new-calendar__content'>
                        <div className='new-calendar__hour-display'>
                            {hoursOfDay.map((hourOfDay: string) => (
                                <div className='new-calendar__hour-indicator' key={hourOfDay}>
                                    <Typography variant='caption'>{hourOfDay}</Typography>
                                </div>
                            ))}
                        </div>
                        <div className='new-calendar__data'>
                            <div className='new-calendar__content-dividers'>
                                {hoursOfDay.map((hourOfDay: string) => (
                                    <div key={hourOfDay} />
                                ))}
                            </div>
                            <div className='new-calendar__calendar-days'>
                                {calendarDayKeys.map((key: string) => {
                                    const calendarDay = this.props.calendar[key]
                                    return (
                                        <div className='new-calendar__calendar-day'>
                                            {calendarDay && calendarDay.blocks.map((calendarEvent: ICalendarEvent) => {
                                                const { startTime, endTime, ...rest } = calendarEvent
                                                const start: Date = moment(`${key} ${startTime}`).toDate()
                                                const end: Date = moment(`${key} ${endTime}`).toDate()
                                                const [startLabel, endLabel] = getTimeRangeLabels(start, end)
                                                const midnight = new Date(`${key} 00:00:00`)
                                                const hoursAfterMidnight = Math.floor(start.getTime() - midnight.getTime()) / (1000 * 60 * 60)
                                                console.log('hoursAfterMignight:', hoursAfterMidnight)
                                                const top: number = 48 * (Math.round(start.getTime() - midnight.getTime()) / (1000 * 60 * 60))
                                                console.log('top:', top)
                                                const height: number = 48 * Math.round(end.getTime() - start.getTime()) / (1000 * 60 * 60)
                                                console.log('midnight:', midnight)
                                                console.log('start:', start)
                                                const minutes: number = getMinutes(moment(calendarEvent.startTime).toDate())
                                                // console.log('minutes:', minutes)

                                                return (
                                                    <CalendarBlock 
                                                        {...rest}
                                                        startTime={startLabel}
                                                        endTime={endLabel}
                                                        style={{ top, height }}
                                                    />
                                                )
                                            })}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Calendar
