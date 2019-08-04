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
import { INotification } from '../../reducers/types'
import { fetchNotifications } from '../../actions/notificationsActions'

interface IState {
    open: boolean
    loading: boolean
    openNotifications: number[]
}

interface ReduxProps {
    notifications: INotification[]
    fetchNotifications: () => any
}

interface IProps extends ReduxProps {}

class NotificationsWidget extends React.Component<IProps> {
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
        open: false,
        loading: false,
        openNotifications: []
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

    handleClick = (id: number) => {
        this.setState((state: IState) => {
            const { openNotifications } = state
            const isOpen = openNotifications.indexOf(id) >= 0
            return {
                ...state,
                openNotifications: isOpen ? (
                    openNotifications.filter((notificationID: number) => notificationID !== id)
                ) : (
                    [...openNotifications, id]
                ) 
            }
        })
    }

    refreshNotifications() {
        this.props.fetchNotifications()
        console.log('refreshNoticiations()')
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
                                <Button disabled={disableActions}>
                                    {`Mark ${unreadCount > 0 ? unreadCount : 'all'} as read`}
                                </Button>
                                <Button disabled={disableActions}>Archive all</Button>
                            </div>
                            <Grow in={this.props.notifications && this.props.notifications.length > 0}>
                                <div className='content-inner'>
                                    {this.props.notifications.map((notification: INotification) => {
                                        const expanded = this.state.openNotifications.indexOf(notification.id) >= 0
                                        return (
                                            <ExpansionPanel
                                                className={classNames('notification', {['--read']: notification.read})}
                                                expanded={expanded}
                                                key={notification.id}
                                            >
                                                <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>} onClick={() => this.handleClick(notification.id)}>
                                                    <div className='notification__info'>
                                                        {expanded ? (
                                                            <>
                                                                <p className='header'>{notification.date}</p>
                                                                <p className='time'>{notification.time}</p>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <p className='header'>
                                                                    {!notification.read && <span className='unread-badge' />}
                                                                    {notification.body}
                                                                </p>
                                                                <p className='time'>{notification.approximateTime}</p>
                                                            </>
                                                        )}
                                                    </div>
                                                </ExpansionPanelSummary>
                                                <ExpansionPanelDetails><p>{notification.body}</p></ExpansionPanelDetails>
                                                <ExpansionPanelActions>
                                                    <Button>Mark Unread</Button>
                                                    <Button>Delete</Button>
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
            </>
        )
    }
}

const mapStateToProps = (state: any) => ({
    notifications: state.notifications.items
})

const mapDispatchToProps = { fetchNotifications }

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsWidget)
