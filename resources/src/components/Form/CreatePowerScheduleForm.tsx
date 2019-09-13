import * as React from 'react'
import { connect } from 'react-redux'

import {
    Button,
    DialogContent,
    Step,
    StepContent,
    StepLabel,
    Stepper,

} from '@material-ui/core'

import { EnhancedTable } from '../Table/EnhancedTable'
import { fetchStudents } from '../../actions/studentActions'
import { IStudent } from '../../types/student'
import { ITableHeaderColumn } from '../../types/table'

interface ReduxProps {
    students: IStudent[]
    fetchStudents: () => Promise<any>
}

interface IProps extends ReduxProps {
    onSubmit: () => Promise<any>
}

interface IState {
    loadingStudents: boolean
    selectedStudents: number[]
    step: number
    uploading: boolean
}

class CreatePowerScheduleForm extends React.Component<IProps, IState> {
    state: IState = {
        selectedStudents: [],
        loadingStudents: false,
        step: 0,
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
                searchable: true,
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
                <DialogContent>
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
                                    selectable
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
                </DialogContent>
            </>
        )
    }
}

const mapDispatchToProps = { fetchStudents }

const mapStateToProps = (state: any) => ({
    students: state.students.items
})

export default connect(mapStateToProps, mapDispatchToProps)(CreatePowerScheduleForm)
