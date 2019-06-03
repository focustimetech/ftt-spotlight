import * as React from 'react'

import {
    Avatar,
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

interface IState {
    open: boolean
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
        id: 1
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
        id: 2
    }
]

export class NotificationsWidget extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props)
        this.escFunction = this.escFunction.bind(this)
    }

    state = {
        open: false
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

    componentDidMount() {
        document.addEventListener('keydown', this.escFunction, false)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.escFunction, false)
    }

    render (){
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
                            <div className='notifications_modal__actions'>
                                <Button>Mark all read</Button>
                                <Button>Delete all</Button>
                            </div>
                            {data.length > 0 ? (
                                <div className='content-inner'>
                                    {data.map((notification: any) => (
                                        <ExpansionPanel className='notification' key={notification.id}>
                                            <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
                                                <div className='notification__sender'>
                                                    <Avatar className='icon'>CU</Avatar>
                                                    <div className='info'>
                                                        <div className='sender-info'>
                                                            <h4>{notification.sender.name}</h4>
                                                            <h4>{notification.date}</h4>
                                                        </div>
                                                        <p className='message'>{notification.message}</p>
                                                    </div>
                                                </div>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails><p>{notification.message}</p></ExpansionPanelDetails>
                                            <ExpansionPanelActions>
                                                <Button>Mark Unread</Button>
                                                <Button>Delete</Button>
                                            </ExpansionPanelActions>
                                        </ExpansionPanel>
                                    ))}
                                </div>
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