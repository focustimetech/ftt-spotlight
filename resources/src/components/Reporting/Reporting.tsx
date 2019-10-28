import * as React from 'react'
import { connect } from 'react-redux'
import {
    Route,
    RouteComponentProps,
    Switch
} from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import {
    Button,
    ButtonGroup,
    Card,
    CardActionArea,
    CardContent,
    CircularProgress,
    Icon,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Menu,
    MenuItem,
    Radio,
    Tooltip,
    Typography
} from '@material-ui/core'

import {
    IReportVariantInfo,
    IReportGroupInfo,
    Report,
    ReportGroup,
    ReportingState,
    ReportVariant,
} from '../../types/report'
import { createEmptyReport, REPORT_PLACEHOLDER_NAME } from '../../utils/report'
import {
    fetchReports,
    createReport,
    updateReport,
    deleteReport,
    fetchReportByID
} from '../../actions/reportActions'
import { ISnackbar, queueSnackbar } from '../../actions/snackbarActions'
import { ReportEditor } from './ReportEditor'
import { INavLink, TopNav } from '../TopNav'
import { Drawer } from '../Drawer'
import { EmptyStateIcon } from '../EmptyStateIcon'
import { LoadingButton } from '../Form/LoadingButton'
import { ReportNameModal } from './ReportNameModal'
import { ReportUnsavedModal } from './ReportUnsavedModal'
import { ReportDeleteModal } from './ReportDeleteModal'
import { Banner, IProps as BannerProps } from '../Banner/Banner'

type ReportingRoute = 'unselected' | 'new' | 'saved'

type BannerIndex = 
    | 'NOT_FOUND'
    | 'REPORT_PRIVATE'

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

const BANNERS: Record<BannerIndex, Partial<BannerProps>> = {
    NOT_FOUND: {
        icon: 'report_problem',
        message: 'The Report associated with this link could not be found.'
    },
    REPORT_PRIVATE: {
        icon: 'lock',
        message: "This Report isn't public, so only the owner of the Report can view it."
    }
}

const DEFAULT_VARIANT: ReportVariant = 'teacher-distribution'

interface ReduxProps {
    changedReport: Report
    reports: Report[]
    createReport: (report: Report) => Promise<any>
    deleteReport: (reportID: number) => Promise<any>
    fetchReports: () => Promise<any>
    queueSnackbar: (snackbar: ISnackbar) => void
    updateReport: (report: Report) => Promise<any>
}

interface IProps extends RouteComponentProps, ReduxProps {
    reportingRoute: ReportingRoute
}

interface IState {
    accessMenuRef: any
    bannerIndex: BannerIndex
    bannerOpen: boolean
    currentReport: Report
    deleteReportModalOpen: boolean
    deletingReport: Report
    drawerOpen: boolean
    loadingReports: boolean
    loadingSingleReport: boolean
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
        bannerIndex: 'NOT_FOUND',
        bannerOpen: false,
        currentReport: createEmptyReport(DEFAULT_VARIANT),
        deleteReportModalOpen: false,
        deletingReport: null,
        drawerOpen: true,
        loadingReports: false,
        loadingSingleReport: false,
        reportID: -1,
        reportingState: 'idle',
        reportNameModalOpen: false,
        reportUnsavedModalOpen: false,
        saveMenuRef: null,
        savedReport: null,
        uploading: false,
        onRejectSaveReport: () => null
    }

    handleUpdateReport = (params: Partial<Report>) => {
        if (this.state.uploading)
            return
        this.setState((state: IState) => {
            const updatedReport: Report = { ...state.currentReport, ...params } as Report
            return { currentReport: updatedReport }
        })
    }

    handleCreateReport = (variant: ReportVariant = DEFAULT_VARIANT) => {
        this.props.history.push('/reporting/new')
        this.setState({
            savedReport: null,
            currentReport: createEmptyReport(variant)
        })
    }

    toggleDrawerOpen = () => {
        this.setState((state: IState) => ({ drawerOpen: !state.drawerOpen }))
    }

    fetchReports = (): Promise<any> => {
        this.setState({ loadingReports: true })
        return this.props.fetchReports().then(() => {
            this.setState({ loadingReports: false })
        })
    }

    handleLoadReport = (report: Report) => {
        if (this.isReportUnchanged()) {
            this.setState({
                savedReport: report,
                currentReport: report
            })
            this.props.history.push(`/reporting/${report.id}`)
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
            this.setState({ uploading: true })
            this.props.updateReport(this.state.currentReport)
                .then(() => {
                    this.setState({
                        uploading: false,
                        savedReport: this.state.currentReport
                    })
                    this.props.queueSnackbar({ message: 'Updated Report successfully.' })
                })
                .catch((error: any) => {
                    this.setState({ uploading: false })
                })
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
                this.props.history.push(`/reporting/${this.props.changedReport.id}`)
                this.props.queueSnackbar({ message: 'Created Report successfully.' })
                this.setState({
                    currentReport: this.props.changedReport,
                    savedReport: this.props.changedReport,
                    uploading: false
                })
            })
            .catch((error: any) => {
                console.error(error)
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
                if (this.props.reportingRoute === 'saved') {
                    const routerReportID = (this.props.match.params as any).reportID
                    if (parseInt(routerReportID) === reportID)
                        this.handleCreateReport()
                }
            })
            .catch((error: any) => {
                const { response } = error
				if (response && response.data.message)
					this.props.queueSnackbar({ message: response.data.message })
            })
    }

    componentDidMount() {
        this.fetchReports().then(() => {
            const reportID: number = parseInt((this.props.match.params as any).reportID)
            if (this.props.reportingRoute === 'saved') {
                const loadedReport: Report | undefined = this.props.reports.find((report: Report) => {
                    return report.id === reportID
                })
                if (loadedReport) {
                    this.setState({
                        savedReport: loadedReport,
                        currentReport: loadedReport
                    })
                    this.props.history.push(`/reporting/${loadedReport.id}`)
                } else {
                    this.setState({ loadingSingleReport: true })
                    fetchReportByID(reportID)
                        .then((response: any) => {
                            this.setState({ loadingSingleReport: false })
                            const report: Report = response.data
                            this.setState({
                                savedReport: null,
                                currentReport: report
                            })
                        }, (error: any) => {
                            this.setState({ loadingSingleReport: true })
                            const { response } = error
                            this.handleCreateReport()
                            switch (response.status) {
                                case 404:
                                    this.setState({ bannerOpen: true, bannerIndex: 'NOT_FOUND' })
                                    break
                                case 403:
                                    this.setState({ bannerOpen: true, bannerIndex: 'REPORT_PRIVATE' })
                                    break
                                default:
                                    const { response } = error
                                    if (response && response.data.message)
                                        this.props.queueSnackbar({ message: response.data.message })
                                    break
                            }
                        })
                    
                }
            }
        })
    }

    render() {
        console.log('Reporting.PROPS:', this.props)
        console.log('Reporting.STATE:', this.state)
        const loading: boolean = (this.state.loadingReports || this.state.loadingSingleReport) && this.props.reportingRoute === 'saved'
        const isReportUnchanged: boolean = this.isReportUnchanged()
        const breadcrumbs: INavLink[] = [ { value: 'Reporting', to: '/reporting' } ]
        const reportSelected: boolean = this.props.reportingRoute !== 'unselected'
        if (this.state.currentReport && reportSelected)
            breadcrumbs.push({ value: this.state.currentReport.name || REPORT_PLACEHOLDER_NAME })

        const reportGroups: ReportGroup[] = REPORT_GROUPS.map((groupInfo: IReportGroupInfo) => groupInfo.group)
        const variantDetails: IReportVariantInfo = reportGroups
            .reduce((acc: IReportVariantInfo[], reportGroup: ReportGroup, index: number) => {
                acc.push(...REPORT_TYPES[reportGroup])
                return acc
            }, [])
            .find((reportVariantInfo: IReportVariantInfo) => {
                return reportVariantInfo.variant === this.state.currentReport.variant
            })
        
        
        return (
            <>
                <ReportUnsavedModal
                    open={this.state.reportUnsavedModalOpen}
                    onSubmit={this.state.onRejectSaveReport}
                    onClose={() => this.setState({ reportUnsavedModalOpen: false })}
                />
                <ReportNameModal
                    open={this.state.reportNameModalOpen}
                    name={this.state.currentReport.name}
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
                        <div className='drawer__loading'>
                            <CircularProgress size={32} />
                        </div>
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
                    <Banner
                        variant='static'
                        message={BANNERS[this.state.bannerIndex].message}
                        open={this.state.bannerOpen}
                        onClose={() => this.setState({ bannerOpen: false })}
                        {...BANNERS[this.state.bannerIndex]}
                    />
                    <TopNav
                        loading={loading}
                        breadcrumbs={breadcrumbs}
                        actions={
                            <>
                                {reportSelected && (
                                    <>
                                        <div><Button variant='contained' color='primary' disabled={loading}>Run Report</Button></div>
                                        <div>
                                            <ButtonGroup variant='contained'>
                                                <LoadingButton
                                                    disabled={isReportUnchanged || loading}
                                                    onClick={() => this.handleSaveReport()}
                                                    loading={this.state.uploading}
                                                >Save</LoadingButton>
                                                <Button
                                                    size='small'
                                                    onClick={(event: any) => this.setState({ saveMenuRef: event.currentTarget })}
                                                    disabled={loading}
                                                >
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
                                                disabled={loading}
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
                                            <IconButton disabled={loading}><Icon>star_outline</Icon></IconButton>
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
                        <TransitionGroup>
                            <CSSTransition
                                timeout={450}
                                classNames='fade'
                                key={this.props.location.key}
                            >
                                <Switch location={this.props.location}>
                                    <Route 
                                        path={['/reporting/new', '/reporting/:reportID']}
                                        render={(props: RouteComponentProps) => (
                                            <div className='router_page'>
                                                <ReportEditor
                                                    reportingState={this.state.reportingState}
                                                    onUpdateReport={this.handleUpdateReport}
                                                    report={this.state.currentReport}
                                                    variantDetails={variantDetails}
                                                    loading={loading}
                                                    {...props}
                                                />
                                            </div>
                                        )}
                                    />
                                    <Route exact path='/reporting' render={() => (
                                        <div className='router_page'>
                                            {REPORT_GROUPS.map((reportGroup: IReportGroupInfo) => (
                                                <div key={reportGroup.group}>
                                                    <Typography variant='h6'>{reportGroup.name}</Typography>
                                                    <div className='reporting__group'>
                                                        {REPORT_TYPES[reportGroup.group].map((reportVariant: IReportVariantInfo) => (
                                                            <Card className='reporting__variant' key={reportVariant.variant}>
                                                                <CardActionArea onClick={() => this.handleCreateReport(reportVariant.variant)}>
                                                                    <img
                                                                        height={112}
                                                                        style={{ width: '100%', objectFit: 'cover' }}
                                                                        src='/static/images/report-sample.jpg'
                                                                        onLoad={() => this.forceUpdate()}
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
                                        </div>
                                    )} />
                                </Switch>
                            </CSSTransition>
                        </TransitionGroup>
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
