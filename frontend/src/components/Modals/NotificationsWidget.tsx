import * as React from 'react'

import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'

import { EmptyStateIcon } from '../EmptyStateIcon'
import { NavItem } from '../Sidebar/NavItem'

interface IState {
    open: boolean
}

interface IProps {
    count?: number
}

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
					<div className='sidebar_modal notifications_modal'>
                        <div className='sidebar_modal__header'>
                            <IconButton className='button_back' onClick={this.handleClose}><Icon>arrow_back</Icon></IconButton>
                            <h3>Notifications</h3>
                        </div>
                        <div className='sidebar_modal__content'>
                            <EmptyStateIcon variant='no'>
                                <h2>Your inbox is empty</h2>
                                <h3>Notifications that you receive from Spotlight will appear here.</h3>
                            </EmptyStateIcon>
                        </div>
					</div>
				</Drawer>
            </>
        )
    }
}