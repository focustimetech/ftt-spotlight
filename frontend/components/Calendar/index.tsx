import moment from 'moment/moment'
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
    // return startOfWeek(addDays(endOfWeek(endOfDay(date)), 1))
    return addWeeks(date, 1)
}

export const getPreviousWeek = (date: Date): Date => {
    // return startOfWeek(subDays(startOfWeek(startOfDay(date)), 1))
    return subWeeks(date, 1)
}

interface ICalendarProps {
    calendar: ICalendar
    getTitle: (event: ICalendarEvent) => string
    getColor: (event: ICalendarEvent) => string
    getContextTitle?: (contextDetails: ICalendarContextDetails) => React.ReactNode
    onNext?: (date: Date) => void
    onPrevious?: (date: Date) => void
    onRefresh?: () => void
    onDateChange?: (date: Date) => void
    initialDate?: Date
    is24Hour?: boolean
    includeWeekends?: boolean
}

export interface ICalendarSelectedBlock {
    date: Date
    dateKey: string
    blockIndex: number
}

interface ICalendarState {
    currentDate: Date
    pickerRef: EventTarget & HTMLButtonElement
    contextMenuEl: Element
    selectedBlock: ICalendarSelectedBlock
}

class Calendar extends React.Component<ICalendarProps, ICalendarState> {
    state: ICalendarState = {
        currentDate: this.props.initialDate || new Date(),
        pickerRef: null,
        contextMenuEl: null,
        selectedBlock: null
    }

    handleNext = () => {
        this.setState((state: ICalendarState) => {
            const nextWeek: Date = getNextWeek(state.currentDate)
            if (this.props.onNext) {
                this.props.onNext(nextWeek)
            }
            if (this.props.onDateChange) {
                this.props.onDateChange(nextWeek)
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
            if (this.props.onDateChange) {
                this.props.onDateChange(previousWeek)
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
        if (this.props.onDateChange) {
            this.props.onDateChange(date)
        }
    }

    handleOpenContextMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, selectedBlock: ICalendarSelectedBlock) => {
        this.setState({
            contextMenuEl: event.currentTarget,
            selectedBlock
        })
    }

    handleCloseContextMenu = () => {
        this.setState({ contextMenuEl: null })
    }

    render() {
        const { currentDate, selectedBlock } = this.state
        const { calendar, is24Hour, includeWeekends, onRefresh } = this.props
        const weekStartsOn: DayOfWeekNumber = includeWeekends ? 0 : 1
        const datesOfWeek: Date[] = getDatesOfWeek(currentDate, weekStartsOn, includeWeekends ? 7 : 5)
        const hoursOfDay: string[] = getHoursOfDay(is24Hour)
        const calendarDayKeys: string[] = []

        const calendarContextDetails: ICalendarContextDetails = selectedBlock ? {
            date: selectedBlock.date,
            event: calendar[selectedBlock.dateKey][selectedBlock.blockIndex],
            color: this.props.getColor(calendar[selectedBlock.dateKey][selectedBlock.blockIndex]),
            title: this.props.getTitle(calendar[selectedBlock.dateKey][selectedBlock.blockIndex]),
        } : initialContextDetails
        // const pickerOpen: boolean = Boolean(this.state.pickerRef)

        return (
            <div className='calendar'>
                <CalendarContextMenu
                    getTitle={this.props.getContextTitle}
                    contextDetails={calendarContextDetails}
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
                    onRefresh={onRefresh}
                    variant='week'
                />
                <div className='calendar__body'>
                    <div className='calendar__date-labels'>
                        {datesOfWeek.map((date: Date, index: number) => {
                            // console.log('date:', date)
                            const dayOfWeek: string = format(date, 'iiii', { weekStartsOn })
                            // console.log('dayOfWeek:', dayOfWeek)
                            const dateIsToday: boolean = isToday(date)
                            const key: string = date.toISOString().substr(0, 10)
                            calendarDayKeys.push(key)

                            return (
                                <div className='calendar__date-label' key={index}>
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
                                                .map((event: ICalendarEvent, blockIndex: number) => {
                                                    const { startTime, endTime } = event
                                                    const start: Date = moment(`${key} ${startTime}`).toDate()
                                                    const end: Date = moment(`${key} ${endTime}`).toDate()
                                                    const [startLabel, endLabel] = getTimeRangeLabels(start, end)
                                                    const dayStart: Date = moment(`${key} 06:00:00`).toDate()
                                                    // const hoursAfterDayStart: number = Math.floor(start.getTime() - dayStart.getTime()) / (1000 * 60 * 60)
                                                    const top: number = BLOCK_HEIGHT * (Math.round(start.getTime() - dayStart.getTime()) / (1000 * 60 * 60))
                                                    const height: number = BLOCK_HEIGHT * Math.round(end.getTime() - start.getTime()) / (1000 * 60 * 60)
                                                    // const minutes: number = getMinutes(moment(event.startTime).toDate())

                                                    const color: string = this.props.getColor(event)
                                                    const title: string = this.props.getTitle(event)

                                                    return (
                                                        <CalendarBlock
                                                            key={blockIndex}
                                                            numLines={Math.floor((height - 8) / 15)}
                                                            event={{ ...event, startTime: startLabel, endTime: endLabel}}
                                                            date={start}
                                                            color={color}
                                                            title={title}
                                                            style={{ top, height }}
                                                            onClick={(event) => this.handleOpenContextMenu(event, { dateKey: key, blockIndex, date: start })}
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
