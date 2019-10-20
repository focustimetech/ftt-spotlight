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

import { IReportGroup, IReportType, ReportGroup } from '../../types/report'
import { TopNav } from '../TopNav'

type ReportingState = 'idle' | 'running' | 'errored'

const REPORT_GROUPS: IReportGroup[] = [
    { group: 'staff', name: 'Staff Reports' },
    { group: 'students', name: 'Student Reports' },
]

const REPORT_TYPES: Record<ReportGroup, IReportType[]> = {
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
    reportingState: ReportingState
}

class Reporting extends React.Component<IProps, IState> {
    state: IState = {
        reportingState: 'idle'
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
                    }
                />
                <Typography variant='h2'>New Report</Typography>
                </div>
            </>
        )
    }
}

export default Reporting
