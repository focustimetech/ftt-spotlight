import * as React from 'react'
import DateFnsUtils from '@date-io/date-fns'

import {
    ClickAwayListener,
    Divider,
    FormControl,
    FormHelperText,
    MenuItem,
    TextField,
    Typography,
    Select,
    OutlinedInput,
} from '@material-ui/core'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

import { Report, ReportSegment } from '../../types/report'
import { DateRange, IAbsoluteDateRange, PredefinedDateRange } from '../../types/date'
import {
    dateRangeToString,
    normalizeDateRange,
    PREDEFINED_LABELS,
    DATE_SEGMENT_LABELS,
} from '../../utils/date'

interface IProps {
    dateRange: DateRange
    segment: ReportSegment
    disabled: boolean
    onUpdateReport: (params: Partial<Report>) => void
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
        newDateRange[point] = date
        if (newDateRange.start > newDateRange.end)
            newDateRange = { ...newDateRange, start: newDateRange.end, end: newDateRange.start }
        this.handleChangeDateRange(newDateRange)
    }

    handlePredefinedDateSelect = (predefinedDateRange: PredefinedDateRange) => {
        this.handleChangeDateRange({
            type: 'predefined',
            range: predefinedDateRange
        })
    }

    handleChangeDateRange = (dateRange: DateRange) => {
        this.props.onUpdateReport({ date_range: dateRange })
    }

    handleChangeSegment = (event: any) => {
        const segment: ReportSegment = event.target.value as ReportSegment
        this.props.onUpdateReport({ segment })
    }

    render() {
        const open: boolean = Boolean(this.state.widgetRef)
        const normalizedDateRange: IAbsoluteDateRange = normalizeDateRange(this.props.dateRange)
        return (
            <>
                <FormControl variant='outlined'>
                    <Select
                        input={<OutlinedInput labelWidth={0}/>}
                        renderValue={(value: any) => <span>{value}</span>}
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
                        disabled={this.props.disabled}
                    >
                        <ClickAwayListener onClickAway={() => this.handleClose()}>
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
                                                        label='End date'
                                                        value={normalizedDateRange.end}
                                                        onChange={(date: Date) => this.handleDatePickerSelect('end', date)}
                                                    />
                                                </div>
                                            </MuiPickersUtilsProvider>
                                        </div>
                                    </div>
                                    <div>
                                        <Typography variant='subtitle1'>Date Range Segment</Typography>
                                        <TextField
                                            value={this.props.segment}
                                            onChange={this.handleChangeSegment}
                                            select
                                            variant='standard'
                                            disabled={this.props.disabled}
                                            fullWidth
                                        >
                                            {Object.keys(DATE_SEGMENT_LABELS).map((segment: ReportSegment) => (
                                                <MenuItem value={segment} key={segment}>{DATE_SEGMENT_LABELS[segment][1]}</MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                </div>
                                <Divider orientation='vertical' className='divider' />
                                <div>
                                    <Typography variant='subtitle1'>Predefiend Date Range</Typography>
                                    <ol className='date_widget__predefined_ranges'>
                                    {Object.keys(PREDEFINED_LABELS).map((predefinedDateRange: PredefinedDateRange) => (
                                        <a className='predefined_range' onClick={() => this.handlePredefinedDateSelect(predefinedDateRange)} key={predefinedDateRange}>
                                            <li>{PREDEFINED_LABELS[predefinedDateRange]}</li>
                                        </a>
                                    ))} 
                                    </ol>
                                </div>
                            </div>
                        </ClickAwayListener>
                    </Select>
                </FormControl>
                <FormHelperText>
                    {this.props.dateRange.type === 'absolute' ? '' : (
                        dateRangeToString(normalizeDateRange(this.props.dateRange))
                    )}
                </FormHelperText>
            </>
        )
    }
}

export { DateWidget}
