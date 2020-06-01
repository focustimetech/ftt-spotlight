import moment from 'moment'
import React from 'react'

import {
    addDays,
    addWeeks,
    endOfDay,
    endOfWeek,
    isToday,
    startOfDay,
    startOfWeek,
    subDays,
    subWeeks,
    getMinutes,
    format
} from 'date-fns'

import {
    Button,
    ButtonBase,
    FormControl,
    Icon,
    IconButton,
    Select,
    Typography,
} from '@material-ui/core'

import { DayOfWeekNumber } from '../../types/date'
import {
    ICalendar,
    ICalendarEvent,
    ICalendarEventContext,
    ICalendarContextDetails
} from '../../types/calendar'
import { getDatesOfWeek, getHoursOfDay, getTimeRangeLabels } from '../../utils/date'

import CalendarBlock from './CalendarBlock'
import CalendarContextMenu from './CalendarContextMenu'
import CalendarHeader from './CalendarHeader'

const BLOCK_HEIGHT: number = 92
const initialContextDetails = {
    date: new Date(),
    title: '',
    event: { id: -1, weekDay: -1, label: '', context: {} }
}

export const getNextWeek = (date: Date): Date => {
    return startOfWeek(addDays(endOfWeek(endOfDay(date)), 1))
}

export const getPreviousWeek = (date: Date): Date => {
    return startOfWeek(subDays(startOfWeek(startOfDay(date)), 1))
}

interface ICalendarProps {
    calendar: ICalendar
    getTitle: (event: ICalendarEvent) => string
    getColor: (event: ICalendarEvent) => string
    getContextTitle?: (event: ICalendarEvent) => React.ReactNode
    onNext?: (date: Date) => void
    onPrevious?: (date: Date) => void
    is24Hour?: boolean
    includeWeekends?: boolean
}

interface ICalendarState {
    currentDate: Date
    pickerRef: EventTarget & HTMLButtonElement
    contextMenuEl: Element
    calendarContextDetails: ICalendarContextDetails
}

class Calendar extends React.Component<ICalendarProps, ICalendarState> {
    state: ICalendarState = {
        currentDate: new Date(),
        pickerRef: null,
        contextMenuEl: null,
        calendarContextDetails: initialContextDetails
    }

    handleNext = () => {
        this.setState((state: ICalendarState) => {
            const nextWeek: Date = getNextWeek(state.currentDate)
            if (this.props.onNext) {
                this.props.onPrevious(nextWeek)
            }
            return { currentDate: nextWeek }
        })
    }

    handlePrevious = () => {
        this.setState((state: ICalendarState) => {
            const previousWeek: Date = getPreviousWeek(state.currentDate)
            if (this.props.onPrevious) {
                this.props.onPrevious(previousWeek)
            }
            return { currentDate: previousWeek }
        })
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

    handleOpenContextMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, contextDetails: ICalendarContextDetails) => {
        this.setState({
            contextMenuEl: event.currentTarget,
            calendarContextDetails: contextDetails
        })
    }

    handleCloseContextMenu = () => {
        this.setState({ contextMenuEl: null })
    }

    render() {
        const { currentDate } = this.state
        const { calendar, is24Hour, includeWeekends } = this.props
        const weekStartsOn: DayOfWeekNumber = includeWeekends ? 0 : 1
        const datesOfWeek: Date[] = getDatesOfWeek(currentDate, weekStartsOn, includeWeekends ? 7 : 5)
        const hoursOfDay: string[] = getHoursOfDay(is24Hour)
        const calendarDayKeys: string[] = []
        const pickerOpen: boolean = Boolean(this.state.pickerRef)

        return (
            <div className='calendar'>
                <CalendarContextMenu
                    getTitle={this.props.getContextTitle}
                    {...this.state.calendarContextDetails}
                    anchorEl={this.state.contextMenuEl}
                    onClose={this.handleCloseContextMenu}
                />
                <CalendarHeader
                    date={datesOfWeek[0]}
                    nextLabel='Next week'
                    previousLabel='Previous week'
                    onChange={this.handleSelectDate}
                    onNext={this.handleNext}
                    onPrevious={this.handlePrevious}
                />
                <div className='calendar__body'>
                    <div className='calendar__date-labels'>
                        {datesOfWeek.map((date: Date, index: number) => {
                            console.log('date:', date)
                            const dayOfWeek: string = format(date, 'iiii', { weekStartsOn })
                            console.log('dayOfWeek:', dayOfWeek)
                            const dateIsToday: boolean = isToday(date)
                            const key: string = date.toISOString().substr(0, 10)
                            calendarDayKeys.push(key)

                            return (
                                <div className='calendar__date-label'>
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
                    <div className='calendar__content'>
                        <div className='calendar__hour-display'>
                            {hoursOfDay.map((hourOfDay: string) => (
                                <div className='calendar__hour-indicator' key={hourOfDay}>
                                    <Typography variant='caption'>{hourOfDay}</Typography>
                                </div>
                            ))}
                        </div>
                        <div className='calendar__data'>
                            <div className='calendar__content-dividers'>
                                {hoursOfDay.map((hourOfDay: string) => (
                                    <div key={hourOfDay} />
                                ))}
                            </div>
                            <div className='calendar__calendar-days'>
                                {calendarDayKeys.map((key: string) => {
                                    const calendarEvents: ICalendarEvent[] = calendar[key] || []
                                    return (
                                        <div className='calendar__calendar-day'>
                                            {calendarEvents.filter((event: ICalendarEvent) => event.startTime && event.endTime)
                                                .map((event: ICalendarEvent) => {
                                                    const { startTime, endTime } = event
                                                    const start: Date = moment(`${key} ${startTime}`).toDate()
                                                    const end: Date = moment(`${key} ${endTime}`).toDate()
                                                    const [startLabel, endLabel] = getTimeRangeLabels(start, end)
                                                    const dayStart: Date = moment(`${key} 06:00:00`).toDate()
                                                    const hoursAfterDayStart: number = Math.floor(start.getTime() - dayStart.getTime()) / (1000 * 60 * 60)
                                                    const top: number = BLOCK_HEIGHT * (Math.round(start.getTime() - dayStart.getTime()) / (1000 * 60 * 60))
                                                    const height: number = BLOCK_HEIGHT * Math.round(end.getTime() - start.getTime()) / (1000 * 60 * 60)
                                                    const minutes: number = getMinutes(moment(event.startTime).toDate())

                                                    return (
                                                        <CalendarBlock
                                                            numLines={Math.floor((height - 8) / 15)}
                                                            event={{ ...event, startTime: startLabel, endTime: endLabel}}
                                                            date={start}
                                                            color={this.props.getColor(event)}
                                                            title={this.props.getTitle(event)}
                                                            style={{ top, height }}
                                                            onClick={this.handleOpenContextMenu}
                                                        />
                                                    )
                                                })
                                            }
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
