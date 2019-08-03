import * as React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

import {
    Button,
    Drawer,
    ExpansionPanel,
    ExpansionPanelActions,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
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
            console.log(`${id} is open: ${isOpen}`)
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

    componentDidMount() {
        document.addEventListener('keydown', this.escFunction, false)
        this.props.fetchNotifications()
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.escFunction, false)
    }

    render() {
        const badgeCount: number = this.props.notifications.filter((notification: INotification) => {
            return notification.read === false
        }).length

        return (
            <>
                <NavItem
                    title='Notifications'
                    icon='notifications'
                    badgeCount={badgeCount}
                    onClick={this.handleClickOpen}
                />
                <Drawer open={this.state.open}>
					<div className='sidebar_modal notifications_modal items_modal'>
                        <div className='sidebar_modal__header'>
                            <IconButton className='button_back' onClick={this.handleClose}><Icon>arrow_back</Icon></IconButton>
                            <h3>Notifications</h3>
                        </div>
                        <div className='sidebar_modal__content items_modal__content'>
                            {this.props.notifications && this.props.notifications.length > 0 ? (
                                <>
                                    <div className='notifications_modal__actions'>
                                        <Button>Mark 2 as read</Button>
                                        <Button>Archive all</Button>
                                    </div>
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
                                                                    <p className='time'>2 hours ago</p>
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
                                </>
                            ) : (
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
