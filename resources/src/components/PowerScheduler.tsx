import * as React from 'react'
import { connect } from 'react-redux'
import DateFnsUtils from '@date-io/date-fns'

import {
    Button,
    Chip,
    DialogContent,
    Divider,
    ExpansionPanel,
    ExpansionPanelActions,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Icon,
    List,
    ListItem,
    Paper,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    Typography,
    FormControlLabel,
    Checkbox,
    Radio,
    TextField

} from '@material-ui/core'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'

import { TopNav } from './TopNav'
import { EnhancedTable } from './Table/EnhancedTable'
import { fetchStudents } from '../actions/studentActions'
import { IStudent } from '../types/student'
import { ITableHeaderColumn } from '../types/table'
import { IBlock } from '../types/calendar'

interface IDateRange {
    start: Date
    end: Date
    [key: string]: any
}

interface IBlockRange {
    start: IBlock
    end: IBlock
    [key: string]: any
}

interface ReduxProps {
    students: IStudent[]
    fetchStudents: () => Promise<any>
}

interface IProps extends ReduxProps {
    onSubmit: () => Promise<any>
}

interface IState {
    blockRange: IBlockRange
    date: Date
    datePickerOpen: 'start' | 'end' | null
    dateRange: IDateRange
    loadingStudents: boolean
    memo: string
    selectedStudents: number[]
    step: number
    uploading: boolean
}

const initialState: IState = {
    blockRange: { start: null, end: null },
    date: new Date(),
    datePickerOpen: null,
    dateRange: { start: new Date(), end: new Date()},
    selectedStudents: [],
    loadingStudents: false,
    memo: '',
    step: 0,
    uploading: false,
}

class CreatePowerScheduleForm extends React.Component<IProps, IState> {
    state: IState = initialState

    handleNextStep = () => {
        this.setState((state: IState) => ({
            step: state.step + 1
        }))
    }

    handleResetStep = () => {
        this.setState({ step: 0 })
    }

    handlePreviousStep = () => {
        this.setState((state: IState) => ({
            step: state.step > 0 ? state.step - 1 : 0
        }))
    }

    handleSetSelected = (selectedStudents: number[]) => {
        this.setState({ selectedStudents })
    }

    handleDatePickerSelect = (date: Date, key: 'start' | 'end') => {
        if (!key)
            return
        this.setState((state: IState) => {
            return {
                dateRange: { ...state.dateRange, [key]: date }
            }
        })
    }

    handleMemoChange = (event: any) => {
        this.setState({ memo: event.target.value })
    }

    componentDidMount() {
        this.setState({ loadingStudents: true })
        this.props.fetchStudents()
            .then(() => {
                this.setState({ loadingStudents: false })
            })
    }

    render() {
        const studentTableColumns: ITableHeaderColumn[] = [
            {
                id: 'name',
                label: 'Name',
                th: true,
                isNumeric: false,
                disablePadding: true,
                searchable: false,
                filterable: false,
                visible: true
            },
            {
                id: 'last_name',
                label: 'Last Name',
                isNumeric: false,
                searchable: true,
                filterable: true,
                visible: false
            },
            {
                id: 'first_name',
                label: 'First Name',
                isNumeric: false,
                searchable: true,
                filterable: true,
                visible: false
            },
            {
                id: 'grade',
                label: 'Grade',
                th: false,
                isNumeric: true,
                disablePadding: false,
                searchable: false,
                filterable: true,
                visible: true
            }
        ]

        const students = this.props.students ? (
            this.props.students.map((student: IStudent) => {
                return {
                    id: student.id,
                    name: student.name,
                    last_name: student.last_name,
                    first_name: student.first_name,
                    grade: student.grade
                }
            })
        ) : []

        return (
            <>
                <div className='content' id='content'>
                    <TopNav><h3>Power Scheduler</h3></TopNav>
                    <Stepper activeStep={this.state.step} orientation='vertical'>
                        <Step key={0}>
                            <StepLabel>Select Students</StepLabel>
                            <StepContent>
                                <p>Select students from the table below.</p>
                                <EnhancedTable
                                    title='Students'
                                    loading={this.state.loadingStudents}
                                    columns={studentTableColumns}
                                    data={students}
                                    onSelect={this.handleSetSelected}
                                    selected={this.state.selectedStudents}
                                    searchable
                                />
                                <div className='stepper-actions'>
                                    <Button
                                        disabled={this.state.selectedStudents.length === 0}
                                        variant='contained'
                                        color='primary'
                                        onClick={() => this.handleNextStep()}
                                    >Next</Button>
                                </div>
                            </StepContent>
                        </Step>
                        <Step key={1}>
                            <StepLabel>Select Date and Blocks</StepLabel>
                            <StepContent>
                                <p>Select the start and end date and block for the schedule.</p>
                                <div className='power-scheduler__date'>
                                    <Typography variant='h6'>Start</Typography>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DatePicker
                                            name='start'
                                            variant='inline'
                                            label='Start date'
                                            value={this.state.dateRange.start}
                                            onChange={(date: Date) => this.handleDatePickerSelect(date, 'start')}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                                <div className='power-scheduler__date'>
                                    <Typography variant='h6'>End</Typography>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DatePicker
                                            name='end'
                                            variant='inline'
                                            label='End date'
                                            value={this.state.dateRange.end}
                                            onChange={(date: Date) => this.handleDatePickerSelect(date, 'end')}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                                <div className='stepper-actions'>
                                    <Button variant='text' onClick={() => this.handlePreviousStep()}>Back</Button>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={() => this.handleNextStep()}
                                    >Next</Button>
                                </div>
                            </StepContent>
                        </Step>
                        <Step key={2}>
                            <StepLabel>Select scheduling type</StepLabel>
                            <StepContent>
                                <FormControlLabel
                                    label='Appointment'
                                    control={<Radio checked={true} />}
                                />
                                <TextField
                                    variant='filled'
                                    label='Memo'
                                    placeholder='Schedule change purpose'
                                    value={this.state.memo}
                                    onChange={this.handleMemoChange}
                                />
                                 <div className='stepper-actions'>
                                    <Button variant='text' onClick={() => this.handlePreviousStep()}>Back</Button>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        disabled={this.state.memo.length === 0}
                                        onClick={() => this.handleNextStep()}
                                    >Next</Button>
                                </div>
                            </StepContent>
                        </Step>
                        <Step key={3}>
                            <StepLabel>Confirm schedule change</StepLabel>
                            <StepContent>
                                <p>Confirm here</p>
                                <div className='stepper-actions'>
                                    <Button variant='text' onClick={() => this.handlePreviousStep()}>Back</Button>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={() => this.handleNextStep()}
                                    >Next</Button>
                                </div>
                            </StepContent>
                        </Step>
                        <Step key={4} completed={this.state.step >= 4}>
                            <StepLabel>Done</StepLabel>
                            <StepContent>
                                <p>All done! The schedule change has been processes successfully.</p>
                                <div className='stepper-actions'>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={() => this.handleResetStep()}
                                    >Create Another</Button>
                                </div>
                            </StepContent>
                        </Step>
                    </Stepper>
                </div>
            </>
        )
    }
}

const mapDispatchToProps = { fetchStudents }

const mapStateToProps = (state: any) => ({
    students: state.students.items
})

export default connect(mapStateToProps, mapDispatchToProps)(CreatePowerScheduleForm)
