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
    initials: string
    background: string
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

    render() {
        const { menuRef } = this.state
        const { initials, background } = this.props
        const menuOpen = Boolean(menuRef)
        return (
            <>
                <NavItem className='nav_account' title='Account' onClick={this.handleClickOpen}>
                    <Avatar className='nav_avatar' style={{ background }}>{initials}</Avatar>
                </NavItem>
                <Menu
                    open={menuOpen}
                    anchorEl={menuRef}
                    onClose={this.handleClose}
                >
                    <MenuItem>Profile</MenuItem>
                    <MenuItem onClick={() => this.props.onSignOut()}>Sign Out</MenuItem>
                </Menu>
            </>
        )
    }
}