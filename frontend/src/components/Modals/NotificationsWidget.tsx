import * as React from 'react'

import {
    Avatar,
    Button,
    Drawer,
    ExpansionPanel,
    ExpansionPanelActions,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Fade,
    Icon,
    IconButton
} from '@material-ui/core'

import { EmptyStateIcon } from '../EmptyStateIcon'
import { NavItem } from '../Sidebar/NavItem'

interface IState {
    open: boolean
    loading: boolean
    openNotifications: number[]
}

interface IProps {
    count?: number
}

const data = [
    {
        date: 'Mon, Jan 12',
        time: '7:45 AM',
        sender: {
            name: 'Mr. User',
            type: 'staff',
            id: 1
        },
        avatar: {
            text: 'CU',
            background: '#1034CD'
        },
        message: 'This is the body of the message. Sometimes, messages are too long to display.',
        id: 1,
        read: false
    },
    {
        date: 'Tue, Jan 13',
        time: '2:13 PM',
        sender: {
            name: 'Mrs. User',
            type: 'staff',
            id: 2
        },
        avatar: {
            text: 'AB',
            background: '#4024AB'
        },
        message: 'Here is another message.',
        id: 2,
        read: false
    }
]

export class NotificationsWidget extends React.Component<IProps> {
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
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.escFunction, false)
    }

    render() {
        return (
            <>
                <NavItem
                    title='Notifications'
                    icon='notifications'
                    badgeCount={5}
                    onClick={this.handleClickOpen}
                />
                <Drawer open={this.state.open}>
					<div className='sidebar_modal notifications_modal items_modal'>
                        <div className='sidebar_modal__header'>
                            <IconButton className='button_back' onClick={this.handleClose}><Icon>arrow_back</Icon></IconButton>
                            <h3>Notifications</h3>
                        </div>
                        <div className='sidebar_modal__content items_modal__content'>
                            {data.length > 0 ? (
                                <>
                                    <div className='notifications_modal__actions'>
                                        <Button>Mark all read</Button>
                                        <Button>Delete all</Button>
                                    </div>
                                    <div className='content-inner'>
                                        {data.map((notification: any) => {
                                            const expanded = this.state.openNotifications.indexOf(notification.id) >= 0
                                            return (
                                                <ExpansionPanel
                                                    className='notification'
                                                    expanded={expanded}
                                                    key={notification.id}
                                                    // onClick={}
                                                >
                                                    <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>} onClick={() => this.handleClick(notification.id)}>
                                                        <div className='notification__sender'>
                                                            <Avatar className='icon'>CU</Avatar>
                                                            <div className='info'>
                                                                <div className='sender-info'>
                                                                    <h4>{notification.sender.name}</h4>
                                                                    <h4>{notification.date}</h4>
                                                                </div>
                                                                {expanded ? (
                                                                    <p className='time'>{notification.time}</p>
                                                                ) : (
                                                                    <p className='message'>{notification.message}</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails><p>{notification.message}</p></ExpansionPanelDetails>
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