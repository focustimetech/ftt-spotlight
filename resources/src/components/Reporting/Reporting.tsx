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
import { ReportNameModal } from './ReportNameModal'
import { ReportUnsavedModal } from './ReportUnsavedModal'

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
    accessMenuRef: any
    currentReport: Report
    drawerOpen: boolean
    loadingReports: boolean
    reportID: number
    reportingState: ReportingState
    reportUnsavedModalOpen: boolean
    savedReport: Report
    onRejectSaveReport: () => void
}

class Reporting extends React.Component<IProps, IState> {
    state: IState = {
        accessMenuRef: null,
        currentReport: null,
        drawerOpen: true,
        loadingReports: false,
        reportID: -1,
        reportingState: 'idle',
        reportUnsavedModalOpen: false,
        savedReport: null,
        onRejectSaveReport: () => null
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
        if (this.isReportUnchanged()) {
            this.setState({
                savedReport: report,
                currentReport: report
            })
        } else {
            this.setState({
                onRejectSaveReport: () => {
                    this.setState({
                        savedReport: report,
                        currentReport: report,
                        onRejectSaveReport: () => null
                    })
                }
            }, () => {
                this.setState({ reportUnsavedModalOpen: true })
            })
        }        
    }

    handleChangeAccess = (access: Report['access']) => {
        this.handleUpdateReport({ access })
        this.setState({ accessMenuRef: null })
    }

    isReportUnchanged = (): boolean => {
        return this.state.savedReport != null && this.state.currentReport != null && (
            Object.keys(this.state.currentReport).every((reportKey: string) => {
                return this.state.currentReport[reportKey] === this.state.savedReport[reportKey]
            })
        )
    }

    componentWillMount() {
        if (this.reportSelected())
            this.setState({ currentReport: createEmptyReport('teacher-distribution') })
    }

    componentDidMount() {
        this.fetchReports()
    }

    render() {
        const breadcrumbs: INavLink[] = [ { value: 'Reporting', to: '/reporting' } ]
        const reportSelected: boolean = this.reportSelected()
        if (this.state.currentReport && reportSelected)
            breadcrumbs.push({ value: this.state.currentReport.name })

        const reportGroups: ReportGroup[] = REPORT_GROUPS.map((groupInfo: IReportGroupInfo) => groupInfo.group)
        const variantDetails: IReportVariantInfo = reportGroups
            .reduce((acc: IReportVariantInfo[], reportGroup: ReportGroup, index: number) => {
                acc.push(...REPORT_TYPES[reportGroup])
                return acc
            }, [])
            .find((reportVariantInfo: IReportVariantInfo) => {
                return reportVariantInfo.variant === this.state.currentReport.variant
            })
        const isReportUnchanged: boolean = this.isReportUnchanged()
        const loading: boolean = this.state.loadingReports && this.state.reportID !== -1

        return (
            <>
                <ReportUnsavedModal
                    open={this.state.reportUnsavedModalOpen}
                    onSubmit={this.state.onRejectSaveReport}
                    onClose={() => this.setState({ reportUnsavedModalOpen: false })}
                />
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
                                        <div>
                                            <Button
                                                variant='text'
                                                color='primary'
                                                onClick={(event: any) => this.setState({ accessMenuRef: event.currentTarget})}
                                            >
                                                <Icon>{this.state.currentReport.access === 'public' ? 'public' : 'lock'}</Icon>
                                                <span>{this.state.currentReport.access === 'public' ? 'Public' : 'Private'}</span>
                                            </Button>
                                            <Menu open={!!this.state.accessMenuRef} ref={this.state.accessMenuRef}>
                                                <MenuItem onClick={() => this.handleChangeAccess('public')}>
                                                    <h6><Icon>public</Icon>Public</h6>
                                                    <p>Anyone with the link to this report can view it.</p>
                                                </MenuItem>
                                                <MenuItem onClick={() => this.handleChangeAccess('public')}>
                                                    <h6><Icon>lock</Icon>Private</h6>
                                                    <p>Only you can view this report.</p>
                                                </MenuItem>
                                            </Menu>
                                        </div>
                                        <div>
                                            <IconButton><Icon>star_outline</Icon></IconButton>
                                        </div>
                                        <div>
                                            <IconButton><Icon>more_vert</Icon></IconButton>
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
                                        variantDetails={variantDetails}
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
