import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import {
    Avatar,
    Menu,
    MenuItem,
    Typography
} from '@material-ui/core'

import { LoadingMenuItem } from '../Form/LoadingMenuItem'
import { NavItem } from '../Sidebar/NavItem'
import { logout } from '../../actions/authActions'
import { IUser } from '../../types/auth'

interface ReduxProps {
    currentUser: IUser
    logout: () => Promise<any>
}

interface IProps extends ReduxProps {
    onSignOut: (callback?: () => void) => void
}

interface IState {
    loadingSignOut: boolean
    menuRef: any
}

class AccountWidget extends React.Component<IProps, IState> {
    state: IState = {
        loadingSignOut: false,
        menuRef: null
    }

    handleClickOpen = (event: any) => {
        this.setState({ menuRef: event.currentTarget })
    }

    handleClose = () => {
        this.setState({ menuRef: null })
    }

    handleSignOut = () => {
        this.setState({ loadingSignOut: true })
        this.props.logout()
            .then(() => {
                this.onSignOut()
            })
            .catch(() => {
                this.onSignOut()
            })
    }

    onSignOut = () => {
        this.setState({ loadingSignOut: false })
        this.props.onSignOut()
    }

    render() {
        const { menuRef } = this.state
        const menuOpen = Boolean(menuRef)
        const { initials, color } = this.props.currentUser.details
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
                    <div className='nav_account_details'>
                        <h3>{this.props.currentUser.display_name}</h3>
                        <h5>{this.props.currentUser.display_role}</h5>
                    </div>
                    <Link to={profileLink}><MenuItem>Profile</MenuItem></Link>
                    <LoadingMenuItem
                        onClick={() => this.handleSignOut()}
                        loading={this.state.loadingSignOut}
                    >Sign Out</LoadingMenuItem>
                </Menu>
            </>
        )
    }
}

const mapStateToProps = (state: any) => ({
    currentUser: state.auth.user
})
const mapDispatchToProps = { logout }

export default connect(mapStateToProps, mapDispatchToProps)(AccountWidget)
