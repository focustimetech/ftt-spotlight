import React from 'react'
import { connect } from 'react-redux'

import {
    Avatar as MuiAvatar,
    Button,
    CircularProgress,
    Chip,
    Collapse,
    FormControl,
    Icon,
    IconButton,
    InputLabel,
    MenuItem,
    ListItemAvatar,
    MenuList,
    Select,
    Typography,
    TextField,
    Divider,
    ListItemText,
    ListItemSecondaryAction
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

import { createAppointment, deleteAppointment, fetchAppointments } from '../../../actions/appointmentActions'
import { fetchClassrooms } from '../../../actions/classroomActions'
import { ISnackbar, queueSnackbar } from '../../../actions/snackbarActions'
import { fetchStudents } from '../../../actions/studentActions'
import { IAvatar, IStudent } from '../../../types/auth'
import { ICalendarEvent } from '../../../types/calendar'
import { INewClassroom, IClassroom } from '../../../types/classroom'
import { IAppointment, INewAppointment } from '../../../types/appointment'
import { getCalendarDateKey } from '../../../utils/date'
import p from '../../../utils/pluralize'
import { createFilterOptions } from '../../../utils/search'

import Avatar from '../../Avatar'
import Flexbox from '../../Layout/Flexbox'
import { LoadingButton } from '../Components/LoadingButton'
import ListForm, {
    ListFormActionArea,
    ListFormContent,
    ListFormEmptyState,
    ListFormHeader,
    ListFormList
} from '../ListForm'
import { FormRow, FormRowElement } from '../'

export interface IAppointmentsFormProps {
    event: ICalendarEvent
    date: Date
}

interface IReduxProps {
    classrooms: IClassroom[]
    newAppointment: IAppointment
    appointments: IAppointment[]
    students: Record<number, IStudent>
    createAppointment: (appointment: INewAppointment, classroom?: INewClassroom) => Promise<any>
    deleteAppointment: (appointmentId: number) => Promise<any>
    fetchAppointments: () => Promise<any>
    fetchClassrooms: () => Promise<any>
    fetchStudents: () => Promise<any>
    queueSnackbar: (snackbar: ISnackbar) => void
}

interface IAppointmentsFormState {
    creating: boolean
    selectedAppointmentId: number
    newStudentIds: number[]
    studentId: number
    memo: string
    capacity: number
    classroom: number
    classroomName: string
    loadingAppointment: boolean
    loadingInitialAppointments: boolean
    loadingInitialStudents: boolean
}

class AppointmentsForm extends React.Component<IAppointmentsFormProps & IReduxProps, IAppointmentsFormState> {
    state: IAppointmentsFormState = {
        creating: false,
        selectedAppointmentId: -1,
        newStudentIds: [],
        studentId: -1,
        memo: '',
        capacity: 30,
        classroom: -1,
        classroomName: '',
        loadingAppointment: false,
        loadingInitialAppointments: false,
        loadingInitialStudents: false
    }

    handleOpenEditing = () => {
        this.setState((state: IAppointmentsFormState) => ({
            selectedAppointmentId: -1,
            creating: true,
            studentId: -1,
            newStudentIds: [],
            memo: '',
            classroom: this.props.classrooms.length > 0 ? this.props.classrooms[0].id : state.classroom
        }))
    }

    handleChangeMemo = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = event.target
        this.setState({ memo: value })
    }

    handleSelectClassroom = (event: React.ChangeEvent<{ name?: string, value: any }>) => {
        const { value } = event.target
        this.setState({ classroom: value })
    }

    handleChangeClassroomName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = event.target
        this.setState({ classroomName: value })
    }

    handleChangeCapacity = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = event.target
        this.setState({ capacity: Number(value) })
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const numAppointments: number = this.state.newStudentIds.length
        const appointment: INewAppointment = {
            memo: this.state.memo,
            studentIds: this.state.newStudentIds,
            classroomId: this.state.classroom,
            blockId: this.props.event.id,
            date: getCalendarDateKey(this.props.date)
        }
        const classroom: INewClassroom = {
            name: this.state.classroomName,
            capacity: this.state.capacity
        }

        this.setState({ loadingAppointment: true })
        this.props.createAppointment(appointment, this.isCreatingClassroom() ? classroom : undefined).then(() => {
            this.setState((state: IAppointmentsFormState) => ({
                loadingAppointment: false,
                selectedAppointmentId: this.props.newAppointment.id,
                newStudentIds: [],
                memo: '',
                classroomName: this.isCreatingClassroom() ? '' : state.classroomName
            }))
            this.props.queueSnackbar({ message: `Created ${p('new Appointment', numAppointments)}.` })
        }, () => {
            this.setState({ loadingAppointment: false })
        })
    }

    isCreatingClassroom = (): boolean => {
        return this.state.classroom === -1
    }

    handleSelectAppointment = (appointment: IAppointment) => {
        this.setState({
            creating: false,
            studentId: appointment.studentId,
            selectedAppointmentId: appointment.id,
            classroom: appointment.classroomId,
            memo: appointment.memo
        })
    }

    handleCancel = () => {
        this.setState({ creating: false, selectedAppointmentId: -1 })
    }

    componentDidMount() {
        if (this.props.appointments.length === 0) {
            this.setState({ loadingInitialAppointments: true })
            this.props.fetchAppointments().then(() => {
                this.setState({ loadingInitialAppointments: false })
            })
        }
        if (!this.props.students || Object.keys(this.props.students).length === 0) {
            this.setState({ loadingInitialStudents: true })
            this.props.fetchStudents().then(() => {
                this.setState({ loadingInitialStudents: false })
            })
        }
        if (this.props.classrooms.length === 0) {
            this.props.fetchClassrooms()
        }
    }

    render() {
        const { classrooms, appointments, students, event, date } = this.props
        const student: IStudent = this.props.students[this.state.studentId]
        const selectedAppointment = appointments.find((a: IAppointment) => a.id === this.state.selectedAppointmentId)
        const savable: boolean = selectedAppointment
            ? this.state.memo !== selectedAppointment.memo || this.state.classroom !== selectedAppointment.classroomId
            : this.state.memo.length > 0 && (this.state.classroom > -1 || this.state.classroomName.length > 0)
        console.log('students:', students)

        const getOptionLabel = (key: number) => students[key].name
        const filterOptions = createFilterOptions(students, { stringify: getOptionLabel })
        const getOptionDisabled = (key: number) => {
            return appointments.some((a: IAppointment) => a.studentId === key && a.blockId === event.id && a.date === getCalendarDateKey(date))
        }

        return (
            <ListForm onSubmit={this.handleSubmit} autoComplete='off'>
                <ListFormHeader>Appointments</ListFormHeader>
                <ListFormList>
                    {appointments.length > 0 && students && Object.keys(students).length > 0 && appointments.map((appointment: IAppointment) => {
                        const student: IStudent = students[appointment.studentId]
                        const avatar: IAvatar = student ? student.avatar : undefined
                        return (
                            <MenuItem onClick={() => this.handleSelectAppointment(appointment)} selected={appointment.id === this.state.selectedAppointmentId}>
                                <ListItemAvatar><Avatar avatar={avatar} /></ListItemAvatar>
                                <ListItemText primary={student.name} secondary={appointment.memo} />
                                <ListItemSecondaryAction><IconButton><Icon>more_vert</Icon></IconButton></ListItemSecondaryAction>
                            </MenuItem>
                        )
                    })}
                </ListFormList>
                {(this.state.loadingInitialStudents || this.state.loadingInitialAppointments || appointments.length === 0) && (
                    <ListFormEmptyState
                        loading={this.state.loadingInitialStudents || this.state.loadingInitialAppointments}
                    >Your Appointments will appear here.</ListFormEmptyState>
                )}
                <ListFormContent visible={this.state.creating || this.state.selectedAppointmentId !== -1}>
                    <>
                        {student && (
                            <Flexbox>
                                <Avatar avatar={student.avatar} />
                                <Typography variant='h6'>{student.name}</Typography>
                            </Flexbox>
                        )}
                        {students && this.state.studentId === -1 && (
                            <Autocomplete<number>
                                loading={this.state.loadingInitialStudents}
                                disabled={Object.keys(students).length === 0}
                                multiple
                                autoComplete
                                fullWidth
                                size='small'
                                options={Object.keys(students).map((key: string) => Number(key))}
                                getOptionLabel={getOptionLabel}
                                getOptionDisabled={getOptionDisabled}
                                filterOptions={(options, { inputValue }) => filterOptions(options, inputValue)}
                                renderInput={(TextFieldProps) => (
                                    <TextField
                                        {...TextFieldProps}
                                        variant='outlined'
                                        label='Students'
                                        placeholder='Student Name'
                                    />
                                )}
                                renderTags={(value: number[], getTagProps) => {
                                    return value.map((option: number, index: number) => {
                                        console.log('OPT3:', option)
                                        return (
                                            <Chip
                                            /*
                                                avatar={
                                                    <MuiAvatar style={{ background: `#${students[option].avatar.color} `}}>
                                                        {students[option].avatar.initials}
                                                    </MuiAvatar>
                                                }
                                            */
                                                avatar={<Avatar size='chip' avatar={students[option].avatar} />}
                                                label={students[option].name}
                                                variant='outlined'
                                                {...getTagProps({ index })}
                                            />
                                        )
                                    })
                                }}
                            />
                        )}
                        <FormRow>
                            <TextField
                                variant='outlined'
                                margin='dense'
                                fullWidth
                                name='appointment-memo'
                                label='Memo'
                                placeholder='Reason for this Appointment'
                                value={this.state.memo}
                                onChange={this.handleChangeMemo}
                                required
                            />
                        </FormRow>
                        <FormRow>
                            <FormRowElement fullWidth>
                                <FormControl variant='outlined' margin='dense' fullWidth>
                                    <InputLabel id='classroom-select-label'>Classroom</InputLabel>
                                    <Select
                                        labelId='classroom-select-label'
                                        name='topic-classroom'
                                        value={this.state.classroom}
                                        onChange={this.handleSelectClassroom}
                                        label='Classroom'
                                    >
                                        <MenuItem value={-1}><em>New Classroom</em></MenuItem>
                                        {classrooms && classrooms.length > 0 && classrooms.map((classroom: IClassroom) => (
                                            <MenuItem value={classroom.id} key={classroom.id}>
                                                <Typography variant='inherit' noWrap>{classroom.name}</Typography>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </FormRowElement>
                        </FormRow>
                        {this.isCreatingClassroom() && (
                            <FormRow>
                                <TextField
                                    label='Classroom'
                                    value={this.state.classroomName}
                                    onChange={this.handleChangeClassroomName}
                                    placeholder='Your classroom name'
                                    name='appointment-classroom-name'
                                    fullWidth
                                    margin='dense'
                                    variant='outlined'
                                    required
                                />
                                <TextField
                                    label='Capacity'
                                    type='number'
                                    name='appointment-classroom-capacity'
                                    value={this.state.capacity}
                                    onChange={this.handleChangeCapacity}
                                    margin='dense'
                                    variant='outlined'
                                    required
                                />
                            </FormRow>
                        )}
                        <FormRow justifyContent='flex-end'>
                            <Button onClick={() => this.handleCancel()}>Cancel</Button>
                            <LoadingButton
                                loading={this.state.loadingAppointment}
                                type='submit'
                                variant='text'
                                color='primary'
                                disabled={!savable}
                            >Save</LoadingButton>
                        </FormRow>
                    </>
                </ListFormContent>
                <ListFormActionArea visible={!this.state.creating}>
                    <Button variant='text' onClick={() => this.handleOpenEditing()} startIcon={<Icon>add</Icon>}>Create Appointment</Button>
                </ListFormActionArea>

            </ListForm>
        )
    }
}

const mapStateToProps = (state) => ({
    appointments: state.appointments.items,
    newAppointment: state.appointments.item,
    classrooms: state.classrooms.items,
    students: state.students.students
})

const mapDispatchToProps = {
    createAppointment,
    deleteAppointment,
    fetchClassrooms,
    fetchAppointments,
    fetchStudents,
    queueSnackbar
}

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentsForm)
