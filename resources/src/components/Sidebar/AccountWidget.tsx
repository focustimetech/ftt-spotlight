import * as React from 'react'
import * as classNames from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import {
    Avatar,
    Menu,
    MenuItem
} from '@material-ui/core'

import { NavItem } from '../Sidebar/NavItem'
import { IUser } from '../../types/auth'

interface ReduxProps {
    currentUser: IUser
}

interface IProps extends ReduxProps {
    onSignOut: (callback?: () => void) => void
}

interface IState {
    menuRef: any
}

class AccountWidget extends React.Component<IProps, IState> {
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
        const { initials, color } = this.props.currentUser.details
        const menuOpen = Boolean(menuRef)
        const profileLink = this.props.currentUser.account_type === 'staff'
            ? `/staff/${this.props.currentUser.details.id}`
            : `/students/${this.props.currentUser.details.id}`

        return (
            <>
                <NavItem className='nav_account' title='Account' onClick={this.handleClickOpen}>
                    <Avatar className={classNames('nav_avatar', `--${color}`)}>{initials}</Avatar>
                </NavItem>
                <Menu
                    open={menuOpen}
                    anchorEl={menuRef}
                    onClose={this.handleClose}
                >
                    <Link to={profileLink}><MenuItem>Profile</MenuItem></Link>
                    <MenuItem onClick={() => this.props.onSignOut()}>Sign Out</MenuItem>
                </Menu>
            </>
        )
    }
}

const mapStateToProps = (state: any) => ({
    currentUser: state.auth.user
})
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AccountWidget)
