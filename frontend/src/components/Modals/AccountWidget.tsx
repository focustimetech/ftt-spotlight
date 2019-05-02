import * as React from 'react'

import {
    Avatar,
    Menu,
    MenuItem
} from '@material-ui/core'

import { NavItem } from '../Sidebar/NavItem'

interface IState {
    menuRef: any
}

interface IProps {
    onSignOut: (callback?: () => void) => void
}

export class AccountWidget extends React.Component<IProps, IState> {
    state: IState = {
        menuRef: null
    }

    handleClickOpen = (event: any) => {
        this.setState({ menuRef: event.currentTarget })
    }

    handleClose = () => {
        this.setState({ menuRef: null })
    }

    initials = 'CU'

    render() {
        const { menuRef } = this.state
        const menuOpen = Boolean(menuRef)
        return (
            <>
                <NavItem className='nav_account' title='Account' onClick={this.handleClickOpen}>
                    <Avatar className='nav_avatar' color='#FF0000'>{this.initials}</Avatar>
                    <Menu
                        open={menuOpen}
                        anchorEl={menuRef}
                        onClose={this.handleClose}
                    >
                        <MenuItem>Profile</MenuItem>
                        <MenuItem onClick={() => this.props.onSignOut()}>Sign Out</MenuItem>
                    </Menu>
                </NavItem>
            </>
        )
    }
}