import * as React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import ContentLoader from 'react-content-loader'

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
    IconButton
} from '@material-ui/core'

import { EmptyStateIcon } from '../EmptyStateIcon'
import { NavItem } from '../Sidebar/NavItem'
import { ISnackbar, ISnackbarButton, queueSnackbar } from '../../actions/snackbarActions'
import { ConfirmationDialog } from './ConfirmationDialog'
import { INotification } from '../../types/staff'
import {
    archiveAllNotifications,
    archiveNotification,
    fetchNotifications,
    markAllNotificationsAsRead,
    markNotificationAsRead,
    markNotificationAsUnread,
    unarchiveNotification
} from '../../actions/notificationsActions'

interface IState {
    archiveAllDialogOpen: boolean
    open: boolean
    loading: boolean
    openNotifications: number[]
    snackbars: ISnackbar[]
}

interface ReduxProps {
    notifications: INotification[]
    archiveAllNotifications: () => void
    archiveNotification: (notification: INotification) => void
    fetchNotifications: () => Promise<any>
    markAllNotificationsAsRead: () => void
    markNotificationAsRead: (notification: INotification) => void
    markNotificationAsUnread: (notification: INotification) => void
    unarchiveNotification: (notification: INotification) => void
    queueSnackbar: (snackbar: ISnackbar) => void
}

interface IProps extends ReduxProps {}

class NotificationsWidget extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.escFunction = this.escFunction.bind(this)
    }

    timer: number // Polling timer

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

    state: IState = {
        archiveAllDialogOpen: false,
        open: false,
        loading: false,
        openNotifications: [],
        snackbars: []
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

    handleClick = (notification: INotification) => {
        const { id, read } = notification
        if (this.state.openNotifications.indexOf(id) >= 0) {
            // Notification is open
            this.handleCloseNotification(id)
        } else {
            // Notification is closed
            this.handleOpenNotification(id)
        }
        if (!read)
            this.handleMarkRead(notification)
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

    refreshNotifications = () => {
        this.props.fetchNotifications()
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

    componentDidMount() {
        // Add event listener for escape key press
        document.addEventListener('keydown', this.escFunction, false)

        // Create polling interval (5 seconds)
        this.timer = window.setInterval(() => this.refreshNotifications(), 3000)
        
        // Fetch Notifications
        this.setState({ loading: true })
        this.props.fetchNotifications().then(
            (res: any) => {
                this.setState({ loading: false })
            }
        )
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.escFunction, false)
        
        // Clear polling timer
        clearInterval(this.timer)
        this.timer = null
    }

    componentDidUpdate(previousProps: IProps) {
        if (this.state.loading || !this.props.notifications || !previousProps.notifications) {
            return
        }
        const currentNotifications: INotification[] = previousProps.notifications
        const newNotifications: INotification[] = this.props.notifications.filter((notification: INotification) => {
            // Collect all notifications that aren't in previous props
            return currentNotifications.every((currentNotification: INotification) => {
                return currentNotification.id !== notification.id && notification.read === false
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
            message: newNotifications[0].body,
            buttons: [showNotificationButton(newNotifications[0].id)]
        }) : ({
            message: `You have ${newNotifications.length} new notifications.`,
            buttons: [showNotificationButton()]
        }))
    }

    render() {
        const unreadCount: number = this.props.notifications.filter((notification: INotification) => {
            return notification.read === false
        }).length

        const disableActions: boolean = !(this.props.notifications && this.props.notifications.length > 0)
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
                            <IconButton className='button_back' onClick={this.handleClose}><Icon>arrow_back</Icon></IconButton>
                            <h3>Notifications</h3>
                        </div>
                        <div className='sidebar_modal__content items_modal__content'>
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
                            <Grow in={this.props.notifications && this.props.notifications.length > 0}>
                                <div className='content-inner'>
                                    {this.props.notifications.map((notification: INotification) => {
                                        const expanded: boolean = this.state.openNotifications.indexOf(notification.id) >= 0
                                        const read: boolean = expanded || notification.read
                                        return (
                                            <ExpansionPanel
                                                className={classNames('notification', {['--read']: read})}
                                                expanded={expanded}
                                                key={notification.id}
                                            >
                                                <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>} onClick={() => this.handleClick(notification)}>
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
                                                <ExpansionPanelDetails><p>{notification.body}</p></ExpansionPanelDetails>
                                                <ExpansionPanelActions>
                                                    <Button onClick={() => this.handleMarkUnread(notification)}>Mark Unread</Button>
                                                    <Button onClick={() => this.handleArchive(notification)}>Archive</Button>
                                                </ExpansionPanelActions>
                                            </ExpansionPanel>
                                        )
                                    })}
                                </div>
                            </Grow>
                            <Fade in={this.state.loading}>{this.contentLoader}</Fade>
                            {(!this.state.loading && this.props.notifications.length === 0) && (
                                <EmptyStateIcon variant='notifications'>
                                    <h2>Your inbox is empty</h2>
                                    <h3>Notifications that you receive from Spotlight will appear here.</h3>
                                </EmptyStateIcon>
                            )}
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
    notifications: state.notifications.items
})

const mapDispatchToProps = {
    archiveAllNotifications,
    archiveNotification,
    fetchNotifications,
    markAllNotificationsAsRead,
    markNotificationAsRead,
    markNotificationAsUnread,
    unarchiveNotification,
    queueSnackbar
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsWidget)
