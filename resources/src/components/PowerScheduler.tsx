import * as React from 'react'
import { connect } from 'react-redux'
import DateFnsUtils from '@date-io/date-fns'

import {
    Button,
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
import { fetchStaff } from '../actions/staffActions'
import { fetchStudents } from '../actions/studentActions'
import { IStaff } from '../types/staff'
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
    staff: IStaff[]
    students: IStudent[]
    fetchStaff: () => Promise<any>
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
    loadingStaff: boolean
    loadingStudents: boolean
    memo: string
    selectedStaff: number[]
    selectedStudents: number[]
    step: number
    uploading: boolean
}

const initialState: IState = {
    blockRange: { start: null, end: null },
    date: new Date(),
    datePickerOpen: null,
    dateRange: { start: new Date(), end: new Date()},
    selectedStaff: [],
    selectedStudents: [],
    loadingStaff: false,
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

    handleSetStudentSelected = (selectedStudents: number[]) => {
        this.setState({ selectedStudents })
    }

    handleSetStaffSelected = (selectedStaff: number[]) => {
        this.setState({ selectedStaff })
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
        this.setState({
            loadingStaff: true,
            loadingStudents: true
        })
        this.props.fetchStudents()
            .then(() => {
                this.setState({ loadingStudents: false })
            })
        this.props.fetchStaff()
            .then(() => {
                this.setState({ loadingStaff: false })
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

        const staffTableColumns: ITableHeaderColumn[] = [
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

        const staff = this.props.staff ? (
            this.props.staff.map((staff: IStaff) => {
                return {
                    id: staff.id,
                    name: staff.name,
                    last_name: staff.last_name,
                    first_name: staff.first_name
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
                                    onSelect={this.handleSetStudentSelected}
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
                                    control={<Radio checked={true} color='primary'/>}
                                />
                                <TextField
                                    variant='filled'
                                    label='Memo'
                                    placeholder='Schedule change purpose'
                                    value={this.state.memo}
                                    onChange={this.handleMemoChange}
                                />
                                <p>Select the staff member for the Appointment.</p>
                                <EnhancedTable
                                    title='Staff'
                                    loading={this.state.loadingStaff}
                                    columns={staffTableColumns}
                                    data={staff}
                                    onSelect={this.handleSetStaffSelected}
                                    selected={this.state.selectedStaff}
                                    searchable
                                    radio
                                />
                                <div className='stepper-actions'>
                                    <Button variant='text' onClick={() => this.handlePreviousStep()}>Back</Button>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        disabled={this.state.memo.length === 0 || this.state.selectedStaff.length === 0}
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

const mapDispatchToProps = { fetchStaff, fetchStudents }

const mapStateToProps = (state: any) => ({
    students: state.students.items,
    staff: state.staff.items
})

export default connect(mapStateToProps, mapDispatchToProps)(CreatePowerScheduleForm)
