import { addDays, format } from 'date-fns'
import moment from 'moment/moment'
import React from 'react'

import DateFnsUtils from '@date-io/date-fns'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

import { Typography } from '@material-ui/core'

import ButtonSelect from '../Form/Components/ButtonSelect'

export interface ICalendarMonthLabelProps {
    date: Date
    days?: number
    includeDay?: boolean
    onChange: (date: Date) => void
}

const CalendarMonthLabel = (props: ICalendarMonthLabelProps) => {
    const [buttonRef, setButtonRef] = React.useState(null)
    const open: boolean = Boolean(buttonRef)
    const days: number = props.days ? props.days - 1 : 6
    const date: Date = moment(props.date).toDate()
    const end: Date = addDays(date, days)
    const { includeDay } = props
    const dateFormat: string = includeDay ? 'MMMM d' : 'MMMM'
    let label: JSX.Element
    if (date.getUTCFullYear() !== end.getUTCFullYear()) {
        label = <>
            <span className='calendar-month-label__month'>{format(date, dateFormat)}</span> {format(date, 'yyyy')} – <span className='calendar-month-label__month'>{format(end, 'MMMM')}</span>{includeDay && ','} {format(end, 'yyyy')}
        </>
    } else if (date.getUTCMonth() !== end.getUTCMonth()) {
        label = <>
            <span className='calendar-month-label__month'>{format(date, dateFormat)}</span> – <span className='calendar-month-label__month'>{format(end, dateFormat)}</span>{includeDay && ','} {format(date, 'yyyy')}
        </>
    } else {
        label = <>
            <span className='calendar-month-label__month'>{format(date, dateFormat)}</span>{includeDay && ','} {format(date, 'yyyy')}
        </>
    }

    return (
        <>
            <ButtonSelect variant='text' onClick={(event) => setButtonRef(event.currentTarget)} open={open}>
                <Typography className='calendar-month-label' variant='h5'>{label}</Typography>
            </ButtonSelect>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                    value={props.date}
                    onChange={props.onChange}
                    onClose={() => setButtonRef(null)}
                    disableToolbar
                    variant='inline'
                    open={open}
                    TextFieldComponent={() => null}
                    PopoverProps={{anchorEl: buttonRef }}
                />
            </MuiPickersUtilsProvider>
        </>
    )
}

export default CalendarMonthLabel
