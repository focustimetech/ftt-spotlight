import DateFnsUtils from '@date-io/date-fns'
import classNames from 'classnames'
import React from 'react'
import ContentLoader from 'react-content-loader'
import { connect } from 'react-redux'
import { Prompt, RouteComponentProps } from 'react-router-dom'

import {
    Avatar,
    Button,
    Icon,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    MenuItem,
    TextField,
    Tooltip,
    Typography
} from '@material-ui/core'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

import { checkIn, fetchCheckInStatus } from '../../actions/checkinActions'
import { ISnackbar, queueSnackbar } from '../../actions/snackbarActions'
import { ICheckInMethodDetails, ILedgerEntry, ISchedulePlan } from '../../types/calendar'
import { CheckInStatus, ICheckInRequest } from '../../types/checkin'
import { getMethodDetailsFromName } from '../../utils/utils'

import { ModalSection } from '../ModalSection'
import { ISelectableListAction, ISelectableListItem, SelectableList } from '../SelectableList'
import { TopNav } from '../TopNav'
import CheckInForm from './CheckInForm'
import ErrorsDialog from './ErrorsDialog'

interface IReduxProps {
    checkInStatus: CheckInStatus
    checkIn: (request: ICheckInRequest) => Promise<any>
    fetchCheckInStatus: (dateTime?: string) => Promise<any>
    queueSnackbar: (snackbar: ISnackbar) => void
}

interface IProps extends IReduxProps, RouteComponentProps {}

interface IState {
    date: Date
    datePickerOpen: boolean
    errorsDialogOpen: boolean
    loadingStatus: boolean
    preventNavigation: boolean
    refreshing: boolean
    scheduledSelected: number[]
}

class CheckIn extends React.Component<IProps, IState> {
    state: IState = {
        date: new Date(),
        datePickerOpen: false,
        errorsDialogOpen: false,
        loadingStatus: false,
        preventNavigation: false,
        refreshing: false,
        scheduledSelected: []
    }

    handleDatePickerOpen = () => {
        this.setState({ datePickerOpen: true })
    }

    handleDatePickerClose = () => {
        this.setState({ datePickerOpen: false })
    }

    handleDatePickerSelect = (date: Date) => {
        this.setState({ date })
        this.fetchStatus(date.toISOString())
    }

    fetchStatus = (dateTime?: string): Promise<any> => {
        this.setState({ loadingStatus: true })
        return this.props.fetchCheckInStatus(dateTime)
            .then(() => {
                this.setState({ loadingStatus: false })
            })
    }

    refreshStatus = () => {
        this.setState({ refreshing: true })
        this.props.fetchCheckInStatus(this.state.date.toISOString())
            .then(() => this.setState({ refreshing: false }))
    }

    fetchPrevious = () => {
        this.fetchStatus(this.props.checkInStatus.previous)
    }

    fetchNext = () => {
        this.fetchStatus(this.props.checkInStatus.next)
    }

    fetchToday = () => {
        this.fetchStatus(this.props.checkInStatus.today)
    }

    handleScheduledCheckIn = (selected: Array<string | number>): Promise<any> => {
        const timestamp: string = new Date().toISOString()
        const request: ICheckInRequest = {
            chips: selected.map((value: string | number) => ({ value, timestamp })),
            type: 'student_id',
            date: this.props.checkInStatus.date.full_date
        }
        return this.props.checkIn(request)
            .then(() => {
                return this.props.fetchCheckInStatus(this.props.checkInStatus.date.full_date)
                    .then(() => {
                        this.props.queueSnackbar({ message: 'Checked in students successfully. '})
                    })
            })
    }

    handleSelectAllScheduled = () => {
        if (!this.props.checkInStatus.blocks || !this.props.checkInStatus.blocks[0].planned) {
            return
        }
        const allSelected: boolean
            = this.state.scheduledSelected.length === this.props.checkInStatus.blocks[0].planned.length
        this.setState({
            scheduledSelected: allSelected
                ? []
                : this.props.checkInStatus.blocks[0].planned.map((plan: ISchedulePlan) => plan.student.id)
        })
    }

    handleSelectScheduled = (id: number, newSelected: boolean) => {
        this.setState((state: IState) => ({
            scheduledSelected: newSelected ? (
                [...state.scheduledSelected, id]
            ) : (
                state.scheduledSelected.filter((selected: number) => selected !== id)
            )
        }))
    }

    handleOpenErrorsDialog = () => {
        this.setState({ errorsDialogOpen: true })
    }

    handleCloseErrorsDialog = () => {
        this.setState({ errorsDialogOpen: false })
    }

    handleAllowNavigation = () => {
        this.setState({ preventNavigation: false })
    }

    handlePreventNavigation = () => {
        this.setState({ preventNavigation: true })
    }

    componentDidMount() {
        if (this.props.location.hash === '#errors') {
            this.setState({ errorsDialogOpen: true })
        }
        this.fetchStatus()
    }

    componentDidUpdate() {
        if (this.state.preventNavigation) {
            window.onbeforeunload = () => true
        } else {
            window.onbeforeunload = undefined
        }
    }

    render() {
        const scheduled: ISelectableListItem[] = this.props.checkInStatus.blocks.length > 0 ? (
            this.props.checkInStatus.blocks[0].planned.map((plan: ISchedulePlan) => {
                return { id: plan.student.id, label: plan.student.name }
            })
        ) : []

        const checkedIn: ILedgerEntry[] = this.props.checkInStatus.blocks.length > 0 ? (
            this.props.checkInStatus.blocks[0].ledger_entries
        ) : []

        const actions: ISelectableListAction[] = [
            { icon: 'check', title: 'Check In', callback: this.handleScheduledCheckIn }
        ]

        const CheckInLoader = () => (
            <>
                <div style={{width: 476, height: 558}}>
                    <ContentLoader width={476} height={558}>
                        <rect x={0} y={14} rx={4} ry={4} width={120} height={24} />
                        <rect x={136} y={8} rx={36} ry={36} width={36} height={36} />
                        <rect x={180} y={8} rx={36} ry={36} width={36} height={36} />
                        <rect x={232} y={14} rx={4} ry={4} width={72} height={24} />
                        <rect x={0} y={64} rx={4} ry={4} width={108} height={24} />
                        <rect x={24} y={112} rx={16} ry={16} width={450} height={32} />
                        <rect x={0} y={172} rx={4} ry={4} width={132} height={24} />
                        <rect x={24} y={212} rx={4} ry={4} width={24} height={24} />
                        <rect x={64} y={216} rx={4} ry={4} width={96} height={16} />
                        <rect x={24} y={260} rx={4} ry={4} width={24} height={24} />
                        <rect x={64} y={264} rx={4} ry={4} width={108} height={16} />
                        <rect x={24} y={292} rx={4} ry={4} width={24} height={24} />
                        <rect x={64} y={296} rx={4} ry={4} width={124} height={16} />
                        <rect x={24} y={324} rx={4} ry={4} width={24} height={24} />
                        <rect x={64} y={328} rx={4} ry={4} width={64} height={16} />
                        <rect x={0} y={376} rx={4} ry={4} width={92} height={24} />
                        <rect x={24} y={416} rx={4} ry={4} width={24} height={24} />
                        <rect x={64} y={420} rx={4} ry={4} width={120} height={16} />
                        <rect x={24} y={464} rx={4} ry={4} width={24} height={24} />
                        <rect x={64} y={468} rx={4} ry={4} width={136} height={16} />
                        <rect x={24} y={496} rx={4} ry={4} width={24} height={24} />
                        <rect x={64} y={500} rx={4} ry={4} width={64} height={16} />
                        <rect x={24} y={538} rx={4} ry={4} width={24} height={24} />
                        <rect x={64} y={542} rx={4} ry={4} width={108} height={16} />
                    </ContentLoader>
                </div>
            </>
        )

        return (
            <>
                <Prompt
                    when={this.state.preventNavigation}
                    message='All unsubmitted student numbers will be lost. Are you sure you want to exit?'
                />
                <div className='content' id='content'>
                    <ErrorsDialog open={this.state.errorsDialogOpen} onClose={this.handleCloseErrorsDialog} />
                    <TopNav
                        breadcrumbs={[{ value: 'Check-in' }]}
                        actions={(
                            <Tooltip title='List Errors'>
                                <IconButton onClick={() => this.handleOpenErrorsDialog()}>
                                    <Icon>error_outline</Icon>
                                </IconButton>
                            </Tooltip>
                        )}
                    />
                    {(this.state.loadingStatus && this.props.checkInStatus) ? (
                        <CheckInLoader />
                    ) : (
                        <>
                            <ul className='calendar_header'>
                                <li>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DatePicker
                                            variant='dialog'
                                            open={this.state.datePickerOpen}
                                            onClose={this.handleDatePickerClose}
                                            value={this.state.date}
                                            onChange={this.handleDatePickerSelect}
                                            TextFieldComponent={() => null}
                                        />
                                    </MuiPickersUtilsProvider>
                                    <Button disabled={this.state.preventNavigation} onClick={() => this.handleDatePickerOpen()} variant='outlined'>
                                        <Typography variant='button' color={this.props.checkInStatus.date.is_today ? 'inherit' : 'error'}>
                                            {this.props.checkInStatus.date ? (
                                                `${this.props.checkInStatus.date.day} ${this.props.checkInStatus.date.full_date}`
                                            ) : 'Select Date'}
                                        </Typography>
                                    </Button>
                                </li>
                                <li>
                                    <Tooltip title='Back' placement='top'>
                                        <IconButton onClick={() => this.fetchPrevious()} disabled={this.state.preventNavigation}>
                                            <Icon>chevron_left</Icon>
                                        </IconButton>
                                    </Tooltip>
                                </li>
                                <li>
                                    <Tooltip title='Next' placement='top'>
                                        <IconButton onClick={() => this.fetchNext()} disabled={this.state.preventNavigation}>
                                            <Icon>chevron_right</Icon>
                                        </IconButton>
                                    </Tooltip>
                                </li>
                                <li>
                                    <Button
                                        variant='outlined'
                                        color='primary'
                                        onClick={() => this.fetchToday()}
                                        disabled={(this.props.checkInStatus.date && this.props.checkInStatus.date.is_today) || this.state.preventNavigation}
                                    >Today</Button>
                                </li>
                                <li>
                                    <Tooltip title='Refresh' placement='top'>
                                        <IconButton onClick={() => this.refreshStatus()} disabled={this.state.refreshing || this.state.preventNavigation}>
                                            <Icon>refresh</Icon>
                                        </IconButton>
                                    </Tooltip>
                                </li>
                            </ul>
                            <TextField
                                select
                                variant='outlined'
                                value='focus-block'
                                onChange={() => null}
                                margin='dense'
                                label='Block'
                                disabled
                            >
                                <MenuItem value='focus-block'>Focus Block</MenuItem>
                            </TextField>
                            <CheckInForm
                                disabled={false}
                                dateTime={this.props.checkInStatus.date.full_date}
                                onCheckIn={() => this.props.fetchCheckInStatus(this.props.checkInStatus.date.full_date) }
                                onPreventNavigation={this.handlePreventNavigation}
                                onAllowNavigation={this.handleAllowNavigation}
                                handleOpenErrorsDialog={this.handleOpenErrorsDialog}
                            />
                            <ModalSection
                                icon='event'
                                title='Scheduled'
                                count={scheduled.length}
                                emptyState={<Typography>No students scheduled.</Typography>}
                            >
                                <SelectableList
                                    title='Scheduled Students'
                                    selected={this.state.scheduledSelected}
                                    items={scheduled}
                                    actions={actions}
                                    sortable={true}
                                    sortLabel='Name'
                                    onSelectAll={this.handleSelectAllScheduled}
                                    onToggleSelected={this.handleSelectScheduled}
                                />
                            </ModalSection>
                            <ModalSection
                                icon='how_to_reg'
                                title='Checked In'
                                count={checkedIn.length}
                                emptyState={<Typography>No students checked in.</Typography>}
                            >
                                <List dense>
                                    {checkedIn.map((ledgerEntry: ILedgerEntry) => {
                                        const methodDetails: ICheckInMethodDetails
                                            = getMethodDetailsFromName(ledgerEntry.method)
                                        return (
                                            <ListItem key={ledgerEntry.id}>
                                                <ListItemAvatar>
                                                    <Avatar className={classNames(
                                                        'student_avatar', `--${ledgerEntry.student.color}`
                                                    )}>
                                                        {ledgerEntry.student.initials}
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={ledgerEntry.student.name}
                                                    secondary={
                                                        <span className='--flex-row'>
                                                            <Typography variant='overline'>{ledgerEntry.time}</Typography>
                                                            <Tooltip title={methodDetails.title}>
                                                                <Icon>{methodDetails.icon}</Icon>
                                                            </Tooltip>
                                                        </span>
                                                    }
                                                />
                                            </ListItem>
                                        )
                                    })}
                                </List>
                            </ModalSection>

                        </>
                    )}
                </div>
            </>
        )
    }
}

const mapStateToProps = (state: any) => ({
    checkInStatus: state.checkin.status
})
const mapDispatchToProps = { checkIn, fetchCheckInStatus, queueSnackbar }

export default connect(mapStateToProps, mapDispatchToProps)(CheckIn)
