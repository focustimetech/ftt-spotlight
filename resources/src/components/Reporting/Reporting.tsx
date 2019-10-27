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
    ListItemSecondaryAction,
    ListItemText,
    Menu,
    MenuItem,
    Radio,
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
import { ISnackbar, queueSnackbar } from '../../actions/snackbarActions'
import { ReportEditor } from './ReportEditor'
import { INavLink, TopNav } from '../TopNav'
import { Drawer } from '../Drawer'
import { EmptyStateIcon } from '../EmptyStateIcon'
import { LoadingButton } from '../Form/LoadingButton'
import { ReportNameModal } from './ReportNameModal'
import { ReportUnsavedModal } from './ReportUnsavedModal'
import { ReportDeleteModal } from './ReportDeleteModal'

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
    changedReport: Report
    reports: Report[]
    createReport: (report: Report) => Promise<any>
    deleteReport: (reportID: number) => Promise<any>
    fetchReports: () => Promise<any>
    queueSnackbar: (snackbar: ISnackbar) => void
    updateReport: (report: Report) => Promise<any>
}

interface IProps extends RouteComponentProps, ReduxProps {}

interface IState {
    accessMenuRef: any
    currentReport: Report
    deleteReportModalOpen: boolean
    deletingReport: Report
    drawerOpen: boolean
    loadingReports: boolean
    reportID: number
    reportingState: ReportingState
    reportNameModalOpen: boolean
    reportUnsavedModalOpen: boolean
    saveMenuRef: any
    savedReport: Report
    uploading: boolean
    onRejectSaveReport: () => void
}

class Reporting extends React.Component<IProps, IState> {
    state: IState = {
        accessMenuRef: null,
        currentReport: createEmptyReport('teacher-distribution'),
        deleteReportModalOpen: false,
        deletingReport: null,
        drawerOpen: true,
        loadingReports: false,
        reportID: -1,
        reportingState: 'idle',
        reportNameModalOpen: false,
        reportUnsavedModalOpen: false,
        saveMenuRef: null,
        savedReport: null,
        uploading: false,
        onRejectSaveReport: () => null
    }

    reportSelected = (): boolean => {
        const params: any = this.props.match.params
        const { reportID } = params
        return reportID || this.props.location.pathname == '/reporting/new'
    }

    handleUpdateReport = (params: Partial<Report>) => {
        if (this.state.uploading)
            return
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

    handleSaveReport = () => {
        if (this.state.savedReport) {
            this.props.updateReport(this.state.currentReport)
            this.setState((state: IState) => ({
                savedReport: state.currentReport
            }))
        } else {
            this.handleSaveReportAs()
        }
    }

    handleSaveReportAs = () => {
        this.setState({
            saveMenuRef: null,
            reportNameModalOpen: true
        })
    }

    onSaveReportAs = (reportName: string) => {
        this.setState({ uploading: true, reportNameModalOpen: false })
        this.props.createReport({ ...this.state.currentReport, name: reportName })
            .then(() => {
                this.props.queueSnackbar({ message: 'Created Report successfully.' })
                this.setState({
                    savedReport: this.state.currentReport,
                    uploading: false
                })
            })
            .catch((error: any) => {
                this.setState({ uploading: false })
                const { response } = error
				if (response && response.data.message)
					this.props.queueSnackbar({ message: response.data.message })
            })
    }

    handleDeleteReport = (report: Report) => {
        this.setState({
            deleteReportModalOpen: true,
            deletingReport: report
        })
    }

    onDeleteReport = (reportID: number) => {
        return this.props.deleteReport(reportID)
            .then(() => {
                this.props.queueSnackbar({ message: 'Deleted Report successfully.' })
            })
            .catch((error: any) => {
                const { response } = error
				if (response && response.data.message)
					this.props.queueSnackbar({ message: response.data.message })
            })
    }

    componentDidMount() {
        this.fetchReports()
    }

    render() {
        console.log('Reporting.PROPS:', this.props)
        console.log('Reporting.STATE:', this.state)
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
                <ReportNameModal
                    open={this.state.reportNameModalOpen}
                    onSubmit={this.onSaveReportAs}
                    onClose={() => this.setState({ reportNameModalOpen: false })}
                />
                <ReportDeleteModal
                    open={this.state.deleteReportModalOpen}
                    onDelete={this.onDeleteReport}
                    onClose={() => this.setState({ deleteReportModalOpen: false })}
                    report={this.state.deletingReport}
                    variantDetails={variantDetails}
                />
                <Drawer title='My Reports' open={this.state.drawerOpen}>
                    {this.state.loadingReports ? (
                        <div>Loading...</div>
                    ) : (
                        this.props.reports && this.props.reports.length > 0 ? (
                            <List>
                                {this.props.reports.map((report: Report, index: number) => (
                                    <ListItem dense button key={index} onClick={() => this.handleLoadReport(report)}>
                                        <ListItemText>{report.name}</ListItemText>
                                        <ListItemSecondaryAction>
                                            <IconButton onClick={() => this.handleDeleteReport(report)}>
                                                <Icon>delete</Icon>
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
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
                                                <LoadingButton
                                                    disabled={isReportUnchanged}
                                                    onClick={() => this.handleSaveReport()}
                                                    loading={this.state.uploading}
                                                >Save</LoadingButton>
                                                <Button size='small' onClick={(event: any) => this.setState({ saveMenuRef: event.currentTarget })}>
                                                    <Icon>arrow_drop_down</Icon>
                                                </Button>
                                                <Menu
                                                    open={!!this.state.saveMenuRef}
                                                    anchorEl={this.state.saveMenuRef}
                                                    onClose={() => this.setState({ saveMenuRef: null })}
                                                >
                                                    <MenuItem onClick={() => this.handleSaveReportAs()}>Save As</MenuItem>
                                                </Menu>
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
                                            <Menu
                                                open={!!this.state.accessMenuRef}
                                                anchorEl={this.state.accessMenuRef}
                                                onClose={() => this.setState({ accessMenuRef: null })}
                                            >
                                                <MenuItem className='report_access' onClick={() => this.handleChangeAccess('public')}>
                                                    <div>
                                                        <Radio color='primary' checked={this.state.currentReport.access === 'public'} />
                                                    </div>
                                                    <div>
                                                        <Typography variant='body1' component='h6'><Icon>public</Icon><span>Public</span></Typography>
                                                        <Typography variant='body1' component='p'>Anyone with the link to this report can view it.</Typography>
                                                    </div>
                                                </MenuItem>
                                                <MenuItem className='report_access' onClick={() => this.handleChangeAccess('private')}>
                                                    <div>
                                                        <Radio color='primary' checked={this.state.currentReport.access === 'private'} />
                                                    </div>
                                                    <div>
                                                        <Typography variant='body1' component='h6'><Icon>lock</Icon><span>Private</span></Typography>
                                                        <Typography variant='body1' component='p'>Only you can view this report.</Typography>
                                                    </div>
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
    reports: state.reports.items,
    changedReport: state.reports.item
})

const mapDispatchToProps = {
    fetchReports,
    createReport,
    updateReport,
    deleteReport,
    queueSnackbar
}

export default connect(mapStateToProps, mapDispatchToProps)(Reporting)
