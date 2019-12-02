import classNames from 'classnames'
import React from 'react'
import ContentLoader from 'react-content-loader'
import { connect } from 'react-redux'
import SwipableViews from 'react-swipeable-views'

import {
    Button,
    Drawer,
    ExpansionPanel,
    ExpansionPanelActions,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Fade,
    Grow,
    Icon,
    IconButton,
    Tab,
    Tabs,
    withStyles
} from '@material-ui/core'

import {
    archiveAllNotifications,
    archiveNotification,
    fetchNotificationInbox,
    fetchNotificationOutbox,
    markAllNotificationsAsRead,
    markNotificationAsRead,
    markNotificationAsUnread,
    sendNotification,
    unarchiveNotification
} from '../../actions/notificationsActions'
import { ISnackbar, ISnackbarButton, queueSnackbar } from '../../actions/snackbarActions'
import { IStaffUser } from '../../types/auth'
import {
    INotification,
    INotificationRecieved,
    INotificationRequest,
    INotificationSent
} from '../../types/staff'

import { EmptyStateIcon } from '../EmptyStateIcon'
import { ConfirmationDialog } from '../Modals/ConfirmationDialog'
import { NavItem } from '../Sidebar/NavItem'

const NotificationsTab = withStyles({
    root: { minWidth: 'unset' }
})(Tab)

interface IState {
    archiveAllDialogOpen: boolean
    loadingInbox: boolean
    loadingOutbox: boolean
    open: boolean
    openNotifications: number[]
    sendDialogOpen: boolean
    snackbars: ISnackbar[]
    tab: number
}

interface IReduxProps {
    currentUser: IStaffUser
    inbox: INotificationRecieved[]
    outbox: INotificationSent[]
    archiveAllNotifications: () => void
    archiveNotification: (notification: INotification) => void
    fetchNotificationInbox: () => Promise<any>
    fetchNotificationOutbox: () => Promise<any>
    markAllNotificationsAsRead: () => void
    markNotificationAsRead: (notification: INotification) => void
    markNotificationAsUnread: (notification: INotification) => void
    sendNotification: (request: INotificationRequest) => Promise<any>
    unarchiveNotification: (notification: INotification) => void
    queueSnackbar: (snackbar: ISnackbar) => void
}

class NotificationsWidget extends React.Component<IReduxProps, IState> {
    timer: number // Polling timer

    state: IState = {
        archiveAllDialogOpen: false,
        loadingInbox: false,
        loadingOutbox: false,
        open: false,
        openNotifications: [],
        sendDialogOpen: false,
        snackbars: [],
        tab: 0
    }

    contentLoader = (
        <div className='items_modal__content-loader'>
            <ContentLoader width={500} height={436}>
                <rect x='44' y='44' rx='4' ry='4' height='18' width='348' />
                <rect x='420' y='44' rx='48' ry='48' height='48' width='48' />
                <rect x='44' y='72' rx='4' ry='4' height='18' width='86' />
                <rect x='44' y='116' rx='4' ry='4' height='18' width='348' />
                <rect x='420' y='116' rx='48' ry='48' height='48' width='48' />
                <rect x='44' y='144' rx='4' ry='4' height='18' width='112' />
                <rect x='44' y='188' rx='4' ry='4' height='18' width='348' />
                <rect x='420' y='188' rx='48' ry='48' height='48' width='48' />
                <rect x='44' y='216' rx='4' ry='4' height='18' width='64' />
            </ContentLoader>
        </div>
    )

    constructor(props: IReduxProps) {
        super(props)
        this.escFunction = this.escFunction.bind(this)
    }

    handleClickOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    escFunction = (event: any) => {
        if (event.keyCode === 27) {
            this.setState({ open: false })
        }
    }

    handleInboxClick = (item: INotificationRecieved) => {
        const { notification, read } = item
        this.handleToggleNotificationOpen(notification)
        if (!read) {
            this.handleMarkRead(notification)
        }
    }

    handleToggleNotificationOpen = (notification: INotification) => {
        if (this.state.openNotifications.indexOf(notification.id) >= 0) {
            // Notification is open
            this.handleCloseNotification(notification.id)
        } else {
            // Notification is closed
            this.handleOpenNotification(notification.id)
        }
    }

    handleCloseNotification = (id: number) => {
        this.setState((state: IState) => {
            return {
                ...state,
                openNotifications: state.openNotifications.filter((notificationID: number) => {
                    return notificationID !== id
                })
            }
        })
    }

    handleOpenNotification = (id: number) => {
        this.setState((state: IState) => {
            return {
                ...state,
                openNotifications: [...state.openNotifications, id]
            }
        })
    }

    refreshInbox = () => {
        this.props.fetchNotificationInbox()
    }

    handleArchive = (notification: INotification) => {
        this.props.archiveNotification(notification)
        this.handleCloseNotification(notification.id)
        this.props.queueSnackbar({
            message: 'Archived 1 message.',
            buttons: [
                { value: 'Undo', callback: () => this.handleUnarchive(notification)}
            ]
        })
    }

    handleUnarchive = (notification: INotification) => {
        this.props.unarchiveNotification(notification)
        this.props.queueSnackbar({
            message: 'Unarchived 1 message.'
        })
    }

    handleMarkRead = (notification: INotification) => {
        this.props.markNotificationAsRead(notification)
    }

    handleMarkUnread = (notification: INotification) => {
        this.handleCloseNotification(notification.id)
        this.props.markNotificationAsUnread(notification)
    }

    handleArchiveAll = () => {
        this.setState({ archiveAllDialogOpen: true })
    }

    handleArchiveAllDialogClose = () => {
        this.setState({ archiveAllDialogOpen: false })
    }

    onArchiveAll = (): Promise<any> => {
        this.props.archiveAllNotifications()
        this.props.queueSnackbar({ message: 'Archived all messages.' })
        this.setState({ openNotifications: [] })
        return new Promise((resolve, reject) => {
            resolve()
        })
    }

    handleMarkAllRead = () => {
        this.props.markAllNotificationsAsRead()
    }

    handleTabChange = (tab: number) => {
        this.setState({ tab })
    }

    handleOpenSendDialog = () => {
        this.setState({ sendDialogOpen: true })
    }

    handleCloseSendDialog = () => {
        this.setState({ sendDialogOpen: false })
    }

    componentDidMount() {
        // Add event listener for escape key press
        document.addEventListener('keydown', this.escFunction, false)

        // Create polling interval (10 seconds for administrators, 30 seconds otherwise)
        this.timer = window.setInterval(
            () => this.refreshInbox(),
            this.props.currentUser && this.props.currentUser.details.administrator ? 10000 : 30000
        )

        // Fetch Notifications
        this.setState({ loadingInbox: true, loadingOutbox: true })
        this.props.fetchNotificationInbox().then((res: any) => {
            this.setState({ loadingInbox: false })
        })
        this.props.fetchNotificationOutbox().then((res: any) => {
            this.setState({ loadingOutbox: false })
        })
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.escFunction, false)

        // Clear polling timer
        clearInterval(this.timer)
        this.timer = null
    }

    componentDidUpdate(previousProps: IReduxProps) {
        if (this.state.loadingInbox || this.state.loadingOutbox || !this.props.inbox || !previousProps.inbox) {
            return
        }
        const currentNotifications: INotificationRecieved[] = previousProps.inbox
        const newNotifications: INotificationRecieved[] = this.props.inbox.filter((item: INotificationRecieved) => {
            // Collect all notifications that aren't in previous props
            return currentNotifications.every((currentNotification: INotificationRecieved) => {
                return currentNotification.notification.id !== item.notification.id && item.read === false
            })
        })
        if (newNotifications.length === 0) {
            return
        }

        const showNotificationButton = (id?: number): ISnackbarButton => ({
            value: 'Read More',
            callback: () => {
                this.handleClickOpen()
                if (id) {
                    window.setTimeout(() => {
                        this.handleOpenNotification(id)
                    }, 300)
                }
            }
        })

        this.props.queueSnackbar(newNotifications.length === 1 ? ({
            message: newNotifications[0].notification.body,
            buttons: [showNotificationButton(newNotifications[0].notification.id)]
        }) : ({
            message: `You have ${newNotifications.length} new notifications.`,
            buttons: [showNotificationButton()]
        }))
    }

    render() {
        const unreadCount: number = this.props.inbox.filter((notification: INotificationRecieved) => {
            return notification.read === false
        }).length

        const disableActions: boolean = !(this.props.inbox && this.props.inbox.length > 0)
        return (
            <>
                <NavItem
                    title='Notifications'
                    icon='notifications'
                    badgeCount={unreadCount}
                    onClick={this.handleClickOpen}
                />
                <Drawer open={this.state.open}>
					<div className='sidebar_modal notifications_modal items_modal'>
                        <div className='sidebar_modal__header'>
                            <div>
                                <IconButton className='button_back' onClick={this.handleClose}>
                                    <Icon>arrow_back</Icon>
                                </IconButton>
                                <h3>Notifications</h3>
                            </div>
                            <Tabs value={this.state.tab} indicatorColor='primary' onChange={(event: any, value: number) => this.handleTabChange(value)}>
                                <NotificationsTab label='Inbox' value={0} />
                                <NotificationsTab label='Sent' value={1} />
                            </Tabs>
                        </div>
                        <div className='sidebar_modal__content items_modal__content'>
                            <SwipableViews index={this.state.tab}>
                                <div>
                                    <div className='notifications_modal__actions'>
                                        <Button
                                            disabled={disableActions || unreadCount === 0}
                                            onClick={() => this.handleMarkAllRead()}
                                        >{`Mark ${unreadCount > 0 ? unreadCount : 'all'} as read`}
                                        </Button>
                                        <Button
                                            disabled={disableActions}
                                            onClick={() => this.handleArchiveAll()}
                                        >Archive all</Button>
                                    </div>
                                    <Fade in={this.state.loadingInbox}>{this.contentLoader}</Fade>
                                    <Grow in={this.props.inbox && this.props.inbox.length > 0}>
                                        <div className='content-inner'>
                                            {this.props.inbox.map((item: INotificationRecieved) => {
                                                const notification: INotification = item.notification
                                                const expanded: boolean = this.state.openNotifications.indexOf(notification.id) !== -1
                                                const read: boolean = expanded || item.read
                                                return (
                                                    <ExpansionPanel
                                                        className={classNames('notification', {['--read']: read})}
                                                        expanded={expanded}
                                                        key={notification.id}
                                                    >
                                                        <ExpansionPanelSummary
                                                            expandIcon={<Icon>expand_more</Icon>}
                                                            onClick={() => this.handleInboxClick(item)}
                                                        >
                                                            <div className='notification__info'>
                                                                {expanded ? (
                                                                    <>
                                                                        <p className='header'>{notification.date}</p>
                                                                        <p className='time'>{notification.time}</p>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <p className='header'>
                                                                            {!read && <span className='unread-badge' />}
                                                                            {notification.body}
                                                                        </p>
                                                                        <p className='time'>{notification.approximateTime}</p>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </ExpansionPanelSummary>
                                                        <ExpansionPanelDetails>
                                                            <p>{notification.body}</p>
                                                        </ExpansionPanelDetails>
                                                        <ExpansionPanelActions>
                                                            <Button
                                                                onClick={() => this.handleMarkUnread(notification)}
                                                            >Mark Unread</Button>
                                                            <Button
                                                                onClick={() => this.handleArchive(notification)}
                                                            >Archive</Button>
                                                        </ExpansionPanelActions>
                                                    </ExpansionPanel>
                                                )
                                            })}
                                        </div>
                                    </Grow>
                                    {(!this.state.loadingInbox && this.props.inbox.length === 0) && (
                                        <EmptyStateIcon variant='notifications'>
                                            <h2>Your inbox is empty</h2>
                                            <h3>Notifications that you receive from Spotlight will appear here.</h3>
                                        </EmptyStateIcon>
                                    )}
                                </div>
                                <div>
                                    <Fade in={this.state.loadingInbox}>{this.contentLoader}</Fade>
                                    <Grow in={this.props.outbox && this.props.outbox.length > 0}>
                                        <div className='content-inner'>
                                            {this.props.outbox.map((item: INotificationSent) => {
                                                const notification: INotification = item.notification
                                                const expanded: boolean = this.state.openNotifications.indexOf(notification.id) >= 0
                                                return (
                                                    <ExpansionPanel
                                                        className={classNames('notification', '--read')}
                                                        expanded={expanded}
                                                        key={notification.id}
                                                    >
                                                        <ExpansionPanelSummary
                                                            expandIcon={<Icon>expand_more</Icon>}
                                                            onClick={() => this.handleToggleNotificationOpen(notification)}
                                                        >
                                                            <div className='notification__info'>
                                                                {expanded ? (
                                                                    <>
                                                                        <p className='header'>{notification.date}</p>
                                                                        <p className='time'>{notification.time}</p>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <p className='header'>
                                                                            {notification.body}
                                                                        </p>
                                                                        <p className='time'>{notification.approximateTime}</p>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </ExpansionPanelSummary>
                                                        <ExpansionPanelDetails>
                                                            <p>{notification.body}</p>
                                                        </ExpansionPanelDetails>
                                                        <ExpansionPanelActions>
                                                            <Button
                                                                onClick={() => this.handleMarkUnread(notification)}
                                                            >Mark Unread</Button>
                                                            <Button
                                                                onClick={() => this.handleArchive(notification)}
                                                            >Archive</Button>
                                                        </ExpansionPanelActions>
                                                    </ExpansionPanel>
                                                )
                                            })}
                                        </div>
                                    </Grow>
                                    {(!this.state.loadingOutbox && this.props.outbox.length === 0) && (
                                        <EmptyStateIcon variant='notifications'>
                                            <h2>Your outbox is empty</h2>
                                            <h3>Notifications that you send from Spotlight will appear here.</h3>
                                            <Button
                                                variant='contained'
                                                color='primary'
                                                disabled={false}
                                                onClick={() => this.handleOpenSendDialog()}
                                            >Send Notification</Button>
                                        </EmptyStateIcon>
                                    )}
                                </div>
                            </SwipableViews>
                        </div>
					</div>
				</Drawer>
                <ConfirmationDialog
                    open={this.state.archiveAllDialogOpen}
                    bodyText='Are you sure you want to archive all Notifications? This action cannot be undone.'
                    title='Archive all Notifications'
                    onClose={this.handleArchiveAllDialogClose}
                    onSubmit={this.onArchiveAll}
                />
            </>
        )
    }
}

const mapStateToProps = (state: any) => ({
    currentUser: state.auth.user,
    inbox: state.notifications.inbox,
    outbox: state.notifications.outbox
})

const mapDispatchToProps = {
    archiveAllNotifications,
    archiveNotification,
    fetchNotificationInbox,
    fetchNotificationOutbox,
    markAllNotificationsAsRead,
    markNotificationAsRead,
    markNotificationAsUnread,
    sendNotification,
    unarchiveNotification,
    queueSnackbar
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsWidget)
