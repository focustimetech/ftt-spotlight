import * as React from 'react'

import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import { NavItem } from '../Sidebar/NavItem'

interface IState {
    open: boolean
}

export class AccountWidget extends React.Component<{}, IState> {
    state = {
        open: false
    }

    handleClickOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    initials = 'CU'

    render() {
        return (
            <>
                <NavItem title='Account' onClick={this.handleClickOpen}>
                    <Avatar>{this.initials}</Avatar>
                </NavItem>
                <Menu
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <MenuItem>Profile</MenuItem>
                    <MenuItem>Sign Out</MenuItem>
                </Menu>
            </>
        )
    }
}