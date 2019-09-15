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
    Typography

} from '@material-ui/core'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'

import { TopNav } from './TopNav'
import { EnhancedTable } from './Table/EnhancedTable'
import { fetchStudents } from '../actions/studentActions'
import { IStudent } from '../types/student'
import { ITableHeaderColumn } from '../types/table'
import { IBlock } from '../types/calendar'

const emptyDateBlock: IDateBlock = {
    date: new Date(),
    dateString: new Date().toISOString(),
    blocks: [{
        id: 0,
        flex: false,
        label: 'Block 1'
    }]
}

interface IDateBlock {
    date: Date
    dateString: string
    blocks: IBlock[]
}

interface ReduxProps {
    students: IStudent[]
    fetchStudents: () => Promise<any>
}

interface IProps extends ReduxProps {
    onSubmit: () => Promise<any>
}

interface IState {
    date: Date
    dateBlocks: IDateBlock[]
    datePickerOpen: boolean
    expandedDateBlock: number
    loadingStudents: boolean
    selectedStudents: number[]
    step: number
    uploading: boolean
}

class CreatePowerScheduleForm extends React.Component<IProps, IState> {
    state: IState = {
        date: new Date(),
        dateBlocks: [emptyDateBlock],
        datePickerOpen: false,
        expandedDateBlock: null,
        selectedStudents: [],
        loadingStudents: false,
        step: 1,
        uploading: false
    }

    handleNextStep = () => {
        this.setState((state: IState) => ({
            step: state.step + 1
        }))
    }

    handlePreviousStep = () => {
        this.setState((state: IState) => ({
            step: state.step > 0 ? state.step - 1 : 0
        }))
    }

    handleSetSelected = (selectedStudents: number[]) => {
        this.setState({ selectedStudents })
    }

    handleDatePickerSelect = (date: Date) => {
        this.setState({ date })
    }

    handleDatePickerOpen = () => {
        this.setState({ datePickerOpen: true })
    }

    handleDatePickerClose = () => {
        this.setState({ datePickerOpen: false })
    }

    handleDateBlockClick = (index: number) => {
        this.setState((state: IState) => ({
            expandedDateBlock: state.expandedDateBlock === index ? null : index
        }))
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
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            open={this.state.datePickerOpen}
                            onClose={() => this.handleDatePickerClose()}
                            value={this.state.date}
                            onChange={this.handleDatePickerSelect}
                            TextFieldComponent={() => null}
                        />
                    </MuiPickersUtilsProvider>
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
                                <p>Select date and blocks.</p>
                                {this.state.dateBlocks.map((dateBlock: IDateBlock, index: number) => (
                                    <ExpansionPanel
                                        className='expansion-panel'
                                        expanded={this.state.expandedDateBlock === index}
                                        key={index}>
                                        <ExpansionPanelSummary
                                            className='expansion-panel__summary'
                                            expandIcon={<Icon>expand_more</Icon>}
                                            onClick={() => this.handleDateBlockClick(index)}
                                        >
                                            <Typography className='expansion-panel__heading' variant='body1'>
                                                {dateBlock.dateString}
                                            </Typography>
                                            <div className='expansion-panel__chips'>
                                                <Chip label='Hello World' />
                                                <Chip label='Hello World' />
                                                <Chip label='Hello World' />
                                                <Chip label='Hello World' />
                                                <Chip label='Hello World' />
                                            </div>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>These are some details</ExpansionPanelDetails>
                                        <ExpansionPanelActions>
                                            <Button variant='text'>Delete</Button>
                                        </ExpansionPanelActions>
                                    </ExpansionPanel>
                                ))}
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
