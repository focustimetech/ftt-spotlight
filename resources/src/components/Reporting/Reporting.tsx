import * as React from 'react'
import {
    Route,
    RouteComponentProps,
    Switch
} from 'react-router-dom'

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
import { INavLink, TopNav } from '../TopNav'

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

    reportSelected = (): boolean => {
        const params: any = this.props.match.params
        const { reportID } = params
        return reportID || this.props.location.pathname == '/reporting/new'
    }

    handleUpdateReport = (params: Partial<Report>) => {
        this.setState((state: IState) => {
            const updatedReport: Report = { ...state.currentReport, ...params } as Report
            return { currentReport: updatedReport }
        })
    }

    handleCreateReport = (variant: ReportVariant) => {
        this.props.history.push('/reporting/new')
        this.setState({ currentReport: createEmptyReport(variant) })
    }

    componentWillMount() {
        if (this.reportSelected())
            this.setState({ currentReport: createEmptyReport('teacher-distribution') })
    }

    componentDidMount() {
        if (this.state.currentReport)
            this.fetchReport()
    }

    render() {
        const breadcrumbs: INavLink[] = [ { value: 'Reporting', to: '/reporting' } ]
        const reportSelected: boolean = this.reportSelected()
        if (this.state.currentReport && reportSelected)
            breadcrumbs.push({ value: this.state.currentReport.name })

        const isReportUnchanged: boolean = this.state.savedReport != null && this.state.currentReport != null && (
            Object.keys(this.state.currentReport).every((reportKey: string) => {
                return this.state.currentReport[reportKey] === this.state.savedReport[reportKey]
            })
        )

        return (
            <>
                <div className='content' id='content'>
                    <TopNav
                        breadcrumbs={breadcrumbs}
                        actions={
                            <>
                                {reportSelected && (
                                    <>
                                        <Button variant='contained' color='primary'>Run Report</Button>
                                        <Button variant='contained' disabled={isReportUnchanged}>Save</Button>
                                    </>
                                )}
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
                        <Switch>
                            <Route 
                                path={['/reporting/new', '/reporting/:reportID']}
                                render={(props: RouteComponentProps) => (
                                    <ReportEditor
                                        reportingState={this.state.reportingState}
                                        onUpdateReport={this.handleUpdateReport}
                                        report={this.state.currentReport}
                                        {...props}
                                    />
                                )}
                            />
                            <Route exact path='/reporting'>
                                {REPORT_GROUPS.map((reportGroup: IReportGroupInfo) => (
                                    <div key={reportGroup.group}>
                                        <Typography variant='h6'>{reportGroup.name}</Typography>
                                        <div className='reporting__group'>
                                            {REPORT_TYPES[reportGroup.group].map((reportVariant: IReportVariantInfo) => (
                                                <Card className='reporting__variant' key={reportVariant.variant}>
                                                    <CardActionArea onClick={() => this.handleCreateReport(reportVariant.variant)}>
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
                                ))}
                            </Route>
                        </Switch>
                    </div>    
                </div>
            </>
        )
    }
}

export default Reporting
