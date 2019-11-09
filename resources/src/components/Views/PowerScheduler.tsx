import DateFnsUtils from '@date-io/date-fns'
import axios, { AxiosResponse } from 'axios'
import React from 'react'
import { connect } from 'react-redux'

import {
    Button,
    Collapse,
    FormControl,
    FormControlLabel,
    FormLabel,
    Icon,
    Radio,
    RadioGroup,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    TextField,
    Typography
} from '@material-ui/core'
import StepIcon, { StepIconProps } from '@material-ui/core/StepIcon'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

import { ISnackbar, queueSnackbar } from '../../actions/snackbarActions'
import { fetchStaff } from '../../actions/staffActions'
import { fetchStudents } from '../../actions/studentActions'
import { IBlock } from '../../types/calendar'
import { IStaff } from '../../types/staff'
import { IStudent } from '../../types/student'
import { ITableHeaderColumn } from '../../types/table'

import { LoadingButton } from '../Form/LoadingButton'
import { EnhancedTable } from '../Table/EnhancedTable'
import { TopNav } from '../TopNav'

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

interface IFinalStepContentProps {
    onPrevious: () => void
}

interface IReduxProps {
    staff: IStaff[]
    students: IStudent[]
    fetchStaff: () => Promise<any>
    fetchStudents: () => Promise<any>
    queueSnackbar: (snackbar: ISnackbar) => void
}

interface IState {
    blockRange: IBlockRange
    date: Date
    datePickerOpen: 'start' | 'end' | null
    error: boolean
    dateRange: IDateRange
    loadingStaff: boolean
    loadingStudents: boolean
    loadingSubmit: boolean
    memo: string
    scheduleType: 'appointment' | 'amendment'
    selectedStaff: number[]
    selectedStudents: number[]
    step: number
    studentType: 'all' | 'some'
    subStep: number
    uploading: boolean
}

const initialState: IState = {
    blockRange: { start: null, end: null },
    date: new Date(),
    datePickerOpen: null,
    dateRange: { start: new Date(), end: new Date()},
    error: false,
    selectedStaff: [],
    selectedStudents: [],
    loadingStaff: false,
    loadingStudents: false,
    loadingSubmit: false,
    memo: '',
    scheduleType: null,
    step: 0,
    studentType: null,
    subStep: 0,
    uploading: false,
}

class CreatePowerSchedule extends React.Component<IReduxProps, IState> {
    state: IState = initialState

    handleNextStep = () => {
        this.setState((state: IState) => ({
            error: false,
            step: state.step + 1
        }))
    }

    handleResetStep = () => {
        this.setState({ ...initialState })
    }

    handlePreviousStep = () => {
        this.setState((state: IState) => ({
            error: false,
            step: state.step > 0 ? state.step - 1 : 0
        }))
    }

    handleNextSubStep = () => {
        this.setState((state: IState) => ({
            error: false,
            subStep: state.subStep + 1
        }))
    }

    handlePreviousSubStep = () => {
        this.setState((state: IState) => ({
            error: false,
            subStep: state.subStep > 0 ? state.subStep - 1 : 0
        }))
    }

    handleSetStudentSelected = (selectedStudents: number[]) => {
        this.setState({ selectedStudents })
    }

    handleSetStaffSelected = (selectedStaff: number[]) => {
        this.setState({ selectedStaff })
    }

    handleDatePickerSelect = (date: Date, key: 'start' | 'end') => {
        if (!key) {
            return
        }
        this.setState((state: IState) => {
            return {
                dateRange: { ...state.dateRange, [key]: date }
            }
        })
    }

    handleMemoChange = (event: any) => {
        this.setState({ memo: event.target.value })
    }

    handleScheduleTypeChange = (event: any) => {
        this.setState({ scheduleType: event.target.value })
    }

    handleStudentTypeChange = (event: any) => {
        this.setState({ studentType: event.target.value })
    }

    handleSubmit = () => {
        this.setState({ loadingSubmit: true })
        const data: any = {
            student_type: this.state.studentType,
            schedule_type: this.state.scheduleType,
            student_ids: this.state.selectedStudents,
            staff_id: this.state.selectedStaff[0],
            memo: this.state.memo,
            date_time: this.state.dateRange.start.toISOString()
        }
        axios.post('/api/power-scheduler', data)
            .then((res: AxiosResponse<any>) => {
                this.setState({
                    uploading: false,
                    step: 3
                })
            }, () => {
                this.setState({
                    error: true,
                    uploading: false
                })
            })
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
                id: 'last_name',
                label: 'Last Name',
                th: true,
                disablePadding: true,
                isNumeric: false,
                searchable: true,
                filterable: true,
                visible: true
            },
            {
                id: 'first_name',
                label: 'First Name',
                isNumeric: false,
                th: true,
                disablePadding: true,
                searchable: true,
                filterable: true,
                visible: true
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
                id: 'last_name',
                label: 'Last Name',
                th: true,
                disablePadding: true,
                isNumeric: false,
                searchable: true,
                filterable: true,
                visible: true
            },
            {
                id: 'first_name',
                label: 'First Name',
                th: true,
                disablePadding: true,
                isNumeric: false,
                searchable: true,
                filterable: true,
                visible: true
            },
            {
                id: 'email',
                label: 'Email',
                isNumeric: false,
                th: true,
                disablePadding: true,
                searchable: true,
                filterable: true,
                visible: true
            }
        ]

        const students = this.props.students ? (
            this.props.students.map((student: IStudent) => {
                return {
                    id: student.id,
                    last_name: student.last_name,
                    first_name: student.first_name,
                    grade: student.grade
                }
            })
        ) : []

        const staff = this.props.staff ? (
            this.props.staff.map((staffUser: IStaff) => {
                return {
                    id: staffUser.id,
                    last_name: staffUser.last_name,
                    first_name: staffUser.first_name,
                    email: staffUser.email
                }
            })
        ) : []

        const SubStepIcon = (letter: string) => {
            return (props: StepIconProps) => {
                const { icon, ...rest} = props
                return <StepIcon icon={letter} {...rest}></StepIcon>
            }
        }

        const FinalStepContent = (props: IFinalStepContentProps) => (
            <div className='stepper-actions'>
                <Button variant='text' onClick={() => props.onPrevious()}>Back</Button>
                <LoadingButton
                    variant='contained'
                    color='primary'
                    loading={this.state.loadingSubmit}
                    disabled={this.state.memo.length === 0 || this.state.selectedStaff.length === 0}
                    onClick={() => this.handleSubmit()}
                >Submit</LoadingButton>
            </div>
        )

        return (
            <>
                <div className='content' id='content'>
                    <TopNav breadcrumbs={[{value: 'Power Scheduler'}]} />
                    <Stepper activeStep={this.state.step} orientation='vertical'>
                        <Step key={0}>
                            <StepLabel>Select Students</StepLabel>
                            <StepContent>
                                <FormControl component='fieldset'>
                                    <FormLabel component='legend'>Student group</FormLabel>
                                    <RadioGroup onChange={this.handleStudentTypeChange}>
                                        <FormControlLabel value='all' label='All Students' control={<Radio color='primary' checked={this.state.studentType === 'all'} />} />
                                        <FormControlLabel value='some' label='Some Students' control={<Radio color='primary' checked={this.state.studentType === 'some'}/>} />
                                    </RadioGroup>
                                </FormControl>
                                <Collapse in={this.state.studentType === 'some'}>
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
                                    {(
                                        this.state.selectedStudents.length === students.length && students.length > 0
                                    ) && (
                                        // tslint:disable-next-line: max-line-length
                                        <Typography color='error'><Icon>warning</Icon> Are you sure you don't mean to select All Students? Selecting All Students ensures that students added in the future are also affected.</Typography>
                                    )}
                                </Collapse>
                                <div className='stepper-actions'>
                                    <Button
                                        disabled={
                                            !this.state.studentType
                                            || (this.state.studentType === 'some'
                                            && this.state.selectedStudents.length === 0)
                                        }
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
                                <p>Select the date for the schedule change.</p>
                                <div className='power-scheduler__date'>
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
                                <FormControl component='fieldset'>
                                    <FormLabel component='legend'>Schedule classification</FormLabel>
                                    <RadioGroup onChange={this.handleScheduleTypeChange}>
                                        <FormControlLabel
                                            value='appointment'
                                            label='Appointment'
                                            control={
                                                <Radio
                                                    color='primary'
                                                    checked={this.state.scheduleType === 'appointment'}
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            value='amendment'
                                            label='Amendment'
                                            control={
                                                <Radio
                                                    color='primary'
                                                    checked={this.state.scheduleType === 'amendment'}
                                                />
                                            }
                                        />
                                    </RadioGroup>
                                </FormControl>
                                <Collapse in={Boolean(this.state.scheduleType)}>
                                    <Stepper activeStep={this.state.subStep} orientation='vertical'>
                                        <Step key={0}>
                                            <StepLabel StepIconComponent={SubStepIcon('A')}>Select Staff</StepLabel>
                                            <StepContent>
                                                {/* tslint:disable-next-line: max-line-length} */}
                                                <p>{`Select the staff member for the ${this.state.scheduleType === 'amendment' ? 'Amendment' : 'Appointment'}.`}</p>
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
                                                    <Button
                                                        variant='text'
                                                        onClick={() => this.handlePreviousStep()}
                                                    >Back</Button>
                                                    <Button
                                                        disabled={this.state.selectedStaff.length === 0}
                                                        variant='contained'
                                                        color='primary'
                                                        onClick={() => this.handleNextSubStep()}
                                                    >Next</Button>
                                                </div>
                                            </StepContent>
                                        </Step>
                                        <Step key={1}>
                                            <StepLabel StepIconComponent={SubStepIcon('B')}>Schedule Memo</StepLabel>
                                            <StepContent>
                                                <TextField
                                                    variant='filled'
                                                    label='Memo'
                                                    placeholder='Schedule change purpose'
                                                    margin='normal'
                                                    fullWidth
                                                    multiline
                                                    value={this.state.memo}
                                                    onChange={this.handleMemoChange}
                                                />
                                                <FinalStepContent onPrevious={() => this.handlePreviousSubStep()} />
                                            </StepContent>
                                        </Step>
                                    </Stepper>
                                </Collapse>
                                <Collapse in={!Boolean(this.state.scheduleType)}>
                                    <div className='stepper-actions'>
                                        <Button variant='text' onClick={() => this.handlePreviousStep()}>Back</Button>
                                    </div>
                                </Collapse>
                            </StepContent>
                        </Step>
                        <Step key={3} completed={this.state.step >= 3}>
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

const mapDispatchToProps = { fetchStaff, fetchStudents, queueSnackbar }

const mapStateToProps = (state: any) => ({
    students: state.students.items,
    staff: state.staff.items
})

export default connect(mapStateToProps, mapDispatchToProps)(CreatePowerSchedule)
