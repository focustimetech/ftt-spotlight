import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import {
    Button,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
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
import { ReportEditor } from './ReportEditor'
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

    handleUpdateReport = (params: Partial<Report>) => {
        this.setState((state: IState) => ({
            currentReport: { ...state.currentReport }
        }))
    }

    componentWillMount() {
        const params: any = this.props.match.params
        const { reportID } = params
        if (reportID)
            this.setState({ reportID })
    }

    componentDidMount() {
        if (this.state.reportID !== -1) {
            this.setState({
                savedReport: createEmptyReport('teacher-distribution'),
                currentReport: createEmptyReport('teacher-distribution')
            }, () => {
                this.fetchReport()
            })
        }
    }

    render() {
        // console.log('Reporting.STATE:', this.state)
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
                    <div className='reporting' id='reporting'>
                        {this.state.currentReport === null ? (
                            REPORT_GROUPS.map((reportGroup: IReportGroupInfo) => (
                                <div key={reportGroup.group}>
                                    <Typography variant='h6'>{reportGroup.name}</Typography>
                                    <div className='reporting__group'>
                                        {REPORT_TYPES[reportGroup.group].map((reportVariant: IReportVariantInfo) => (
                                            <Card className='reporting__variant' key={reportVariant.variant}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component='img'
                                                        alt={reportVariant.name}
                                                        title={reportVariant.name}
                                                        height={140}
                                                        image='/static/images/report-sample.jpg'
                                                    />
                                                    <CardContent>
                                                        <Typography variant='h5'>{reportVariant.name}</Typography>
                                                        <Typography variant='body2'>{reportVariant.description}</Typography>
                                                    </CardContent>
                                                </CardActionArea>                                            
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <ReportEditor
                                reportingState={this.state.reportingState}
                                onUpdateReport={this.handleUpdateReport}
                                report={this.state.currentReport}
                            />
                        )}
                    </div>
                </div>
            </>
        )
    }
}

export default Reporting
