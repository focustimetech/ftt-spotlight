import * as React from 'react'
import DateFnsUtils from '@date-io/date-fns'

import {
    Button,
    Divider,
    FormControl,
    FormHelperText,
    InputLabel,
    Icon,
    Menu,
    MenuItem,
    TextField,
    Typography,
    Select,
    OutlinedInput,
} from '@material-ui/core'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

import { DateRange, IAbsoluteDateRange, PredefinedDateRange } from '../../types/date'
import {
    dateRangeToString,
    normalizeDateRange,
    PREDEFINED_LABELS,
} from '../../utils/date'

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

    handlePredefinedDateSelect = (predefinedDateRange: PredefinedDateRange) => {
        this.props.onChange({
            type: 'predefined',
            range: predefinedDateRange
        })
    }

    render() {
        const open: boolean = Boolean(this.state.widgetRef)
        const normalizedDateRange: IAbsoluteDateRange = normalizeDateRange(this.props.dateRange)
        console.log('DateWidget.PROPS:', this.props)
        return (
            <>
                <FormControl variant='filled'>
                    
                    <Select
                        input={<OutlinedInput labelWidth={0}/>}
                        renderValue={(value: any) => <span><Icon>event</Icon>{value}</span>}
                        value={dateRangeToString(this.props.dateRange)}
                        onClose={this.handleClose}
                        MenuProps={{
                            open: open,
                            anchorEl: this.state.widgetRef,
                            onClose: this.handleClose,
                            getContentAnchorEl: null,
                            anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
                            transformOrigin: { vertical: "top", horizontal: "left" }
                        }}
                        onClick={this.handleOpen}
                    >
                        <div className='date_widget'>
                            <div>
                                <div>
                                    <Typography variant='subtitle1'>Absolute Date Range</Typography>
                                    <div className='date_widget__absolute_range'>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <div>
                                                <DatePicker
                                                    variant='inline'
                                                    label='Start date'
                                                    value={normalizedDateRange.start}
                                                    onChange={(date: Date) => this.handleDatePickerSelect('start', date)}
                                                />
                                            </div>
                                            <span>→</span>
                                            <div>
                                                <DatePicker
                                                    variant='inline'
                                                    label='Start date'
                                                    value={normalizedDateRange.start}
                                                    onChange={(date: Date) => this.handleDatePickerSelect('start', date)}
                                                />
                                            </div>
                                        </MuiPickersUtilsProvider>
                                    </div>
                                </div>
                            </div>
                            <Divider orientation='vertical' className='divider' />
                            <div>
                                <Typography variant='subtitle1'>Absolute Date Range</Typography>
                                <ol className='date_widget__predefined_ranges'>
                                {Object.keys(PREDEFINED_LABELS).map((predefinedDateRange: PredefinedDateRange) => (
                                    <a className='predefined_range' onClick={() => this.handlePredefinedDateSelect(predefinedDateRange)} key={predefinedDateRange}>
                                        <li>{PREDEFINED_LABELS[predefinedDateRange]}</li>
                                    </a>
                                ))} 
                                </ol>
                            </div>
                        </div>
                    </Select>
                </FormControl>
                {this.props.dateRange.type !== 'absolute' && (
                    <FormHelperText>{dateRangeToString(normalizeDateRange(this.props.dateRange))}</FormHelperText>
                )}
            </>
        )
    }
}

export { DateWidget}
