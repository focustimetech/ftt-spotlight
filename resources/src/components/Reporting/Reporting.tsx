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

const EMPTY_REPORT: IReport = {
    name: 'New Report',
    dateRange: {
        type: 'predefined',
        range: 'last-week'
    },
    segment: 'day',
    access: 'private'
}

interface IProps extends RouteComponentProps {}

interface IState {
    reportingState: ReportingState
    savedReport: Report
    currentReport: Report
}

class Reporting extends React.Component<IProps, IState> {
    state: IState = {
        reportingState: 'idle',
        savedReport: null,
        currentReport: null
    }

    componentDidMount() {

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
