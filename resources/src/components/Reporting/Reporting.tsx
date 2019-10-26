import * as React from 'react'
import { connect } from 'react-redux'
import {
    Route,
    RouteComponentProps,
    Switch
} from 'react-router-dom'
import ContentLoader from 'react-content-loader'

import {
    Button,
    ButtonGroup,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Icon,
    IconButton,
    List,
    ListItem,
    Menu,
    MenuItem,
    TextField,
    Tooltip,
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
} from '../../types/report'
import { createEmptyReport } from '../../utils/report'
import { fetchReports, createReport, updateReport, deleteReport } from '../../actions/reportActions'
import { ReportEditor } from './ReportEditor'
import { INavLink, TopNav } from '../TopNav'
import { Drawer } from '../Drawer'
import { EmptyStateIcon } from '../EmptyStateIcon'

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

interface ReduxProps {
    reports: IReport[]
    fetchReports: () => Promise<any>
    createReport: (report: IReport) => Promise<any>
}

interface IProps extends RouteComponentProps, ReduxProps {}

interface IState {
    currentReport: Report
    drawerOpen: boolean
    loadingReports: boolean
    reportID: number
    reportingState: ReportingState
    savedReport: Report
}

class Reporting extends React.Component<IProps, IState> {
    state: IState = {
        currentReport: null,
        drawerOpen: true,
        loadingReports: false,
        reportID: -1,
        reportingState: 'idle',
        savedReport: null
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

    toggleDrawerOpen = () => {
        this.setState((state: IState) => ({ drawerOpen: !state.drawerOpen }))
    }

    fetchReports = () => {
        this.setState({ loadingReports: true })
        this.props.fetchReports().then(() => {
            this.setState({ loadingReports: false })
        })
    }

    handleLoadReport = (report: Report) => {
        this.setState({ savedReport: report })
    }

    componentWillMount() {
        if (this.reportSelected())
            this.setState({ currentReport: createEmptyReport('teacher-distribution') })
    }

    componentDidMount() {
        this.fetchReports()
    }

    render() {
        console.log('REPORTING.props:', this.props)
        console.log('REPORTING.state:', this.state)
        const breadcrumbs: INavLink[] = [ { value: 'Reporting', to: '/reporting' } ]
        const reportSelected: boolean = this.reportSelected()
        if (this.state.currentReport && reportSelected)
            breadcrumbs.push({ value: this.state.currentReport.name })

        const isReportUnchanged: boolean = this.state.savedReport != null && this.state.currentReport != null && (
            Object.keys(this.state.currentReport).every((reportKey: string) => {
                return this.state.currentReport[reportKey] === this.state.savedReport[reportKey]
            })
        )
        const loading: boolean = this.state.loadingReports && this.state.reportID !== -1

        return (
            <>
                <Drawer title='My Reports' open={this.state.drawerOpen}>
                    {this.state.loadingReports ? (
                        <div>Loading...</div>
                    ) : (
                        this.props.reports && this.props.reports.length > 0 ? (
                            <List>
                                {this.props.reports.map((report: Report, index: number) => (
                                    <ListItem key={index} onClick={() => this.handleLoadReport(report)}>{report.name}</ListItem>
                                ))}
                            </List>
                        ) : (
                            <EmptyStateIcon variant='star'>
                                <h2>No Reports found</h2>
                                <h3>Reports you save will appear here.</h3> 
                            </EmptyStateIcon>
                        )
                    )}
                </Drawer>
                <div className='content' id='content'>
                    <TopNav
                        breadcrumbs={breadcrumbs}
                        actions={
                            <>
                                {reportSelected && (
                                    <>
                                        <div><Button variant='contained' color='primary'>Run Report</Button></div>
                                        <div>
                                            <ButtonGroup variant='contained'>
                                                <Button disabled={isReportUnchanged}>Save</Button>
                                                <Button size='small'><Icon>arrow_drop_down</Icon></Button>
                                            </ButtonGroup>
                                        </div>                         
                                    </>
                                )}
                                <div>
                                    <Tooltip title='My Reports'>
                                        <IconButton onClick={() => this.toggleDrawerOpen()}>
                                            <Icon>assessment</Icon>
                                        </IconButton>
                                    </Tooltip>
                                </div>   
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

const mapStateToProps = (state: any) => ({
    reports: state.reports.items
})

const mapDispatchToProps = { fetchReports, createReport }

export default connect(mapStateToProps, mapDispatchToProps)(Reporting)
