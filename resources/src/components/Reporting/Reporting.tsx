import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import {
    Button,
    Icon,
    IconButton,
    Menu,
    MenuItem,
    TextField,
    Typography
} from '@material-ui/core'

import {
    IReport,
    IReportVariantInfo,
    IReportGroupInfo,
    Report,
    ReportGroup,
    ReportingState,
    ReportVariant,
    TeacherDistributionReport,
} from '../../types/report'
import { createEmptyReport } from '../../utils/report'
import { TopNav } from '../TopNav'

const REPORT_GROUPS: IReportGroupInfo[] = [
    { group: 'staff', name: 'Staff Reports' },
    { group: 'students', name: 'Student Reports' },
]

const REPORT_TYPES: Record<ReportGroup, IReportVariantInfo[]> = {
    staff: [
        {
            name: 'Teacher Distribution',
            variant: 'teacher-distribution',
            group: 'staff',
            description: 'Distribution of students to teachers.'
        }
    ],
    students: [
        {
            name: 'Student Attendance',
            variant: 'student-attendance',
            group: 'students',
            description: 'Attendance for students.'
        }
    ]
}

interface IProps extends RouteComponentProps {}

interface IState {
    reportID: number
    reportingState: ReportingState
    savedReport: Report
    currentReport: Report
}

class Reporting extends React.Component<IProps, IState> {
    state: IState = {
        reportID: -1,
        reportingState: 'idle',
        savedReport: null,
        currentReport: null
    }

    fetchReport = () => {

    }

    componentWillMount() {
        const params: any = this.props.match.params
        const { reportID } = params
        this.setState({ reportID })
    }

    componentDidMount() {
        if (this.state.reportID !== -1)
            this.fetchReport()
    }

    render() {
        return (
            <>
                <div className='content' id='content'>
                <TopNav
                    breadcrumbs={[{ value: 'Reporting' }]}
                    actions={
                        <>
                            <Button variant='contained' color='primary'>Run Report</Button>
                            <Button variant='contained'>Save</Button>
                        </>
                        /**
                         * Actions to include:
                         * Run Report
                         * Save Report (or Save Report As)
                         * Star/Unstar
                         * Access => Private/Public
                         * New Report => New Variant/Same Variant
                         */
                    }
                />
                </div>
            </>
        )
    }
}

export default Reporting
