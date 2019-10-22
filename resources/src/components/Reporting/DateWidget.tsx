import * as React from 'react'
import DateFnsUtils from '@date-io/date-fns'

import {
    Button,
    FormHelperText,
    Icon,
    Menu,
    Typography
} from '@material-ui/core'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

import { DateRange, IAbsoluteDateRange } from '../../types/date'
import { normalizeDateRange, dateRangeToString } from '../../utils/date'

interface IProps {
    dateRange: DateRange
    onChange: (dateRange: DateRange) => void
}

interface IState {
    widgetRef: any
}

class DateWidget extends React.Component<IProps> {
    state: IState = {
        widgetRef: null
    }

    handleOpen = (event: any) => {
        this.setState({ widgetRef: event.currentTarget })
    }

    handleClose = () => {
        this.setState({ widgetRef: null })
    }

    handleDatePickerSelect = (point: 'start' | 'end', date: Date) => {
        let newDateRange: IAbsoluteDateRange = normalizeDateRange(this.props.dateRange)
        if (point === 'start')
            this.props.onChange({ ...newDateRange, start: date })
        else
            this.props.onChange({ ...newDateRange, end: date })
    }

    render() {
        const open: boolean = Boolean(this.state.widgetRef)
        console.log(this.props.dateRange)
        const normalizedDateRange: IAbsoluteDateRange = normalizeDateRange(this.props.dateRange)
        console.log(normalizedDateRange)
        return (
            <>
                <Button onClick={this.handleOpen}>
                    <Icon>event</Icon>
                    <Typography variant='body1'>{dateRangeToString(this.props.dateRange)}</Typography>
                </Button>
                {this.props.dateRange.type !== 'absolute' && (
                    <FormHelperText>{dateRangeToString(normalizeDateRange(this.props.dateRange))}</FormHelperText>
                )}
                <Menu ref={this.state.widgetRef} open={open} anchorEl={this.state.widgetRef} onClose={this.handleClose}>
                    <div className='date_widget'>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                variant='inline'
                                label='Start date'
                                value={normalizedDateRange.start}
                                onChange={(date: Date) => this.handleDatePickerSelect('start', date)}
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                </Menu>
            </>
        )
    }
}

export { DateWidget}
