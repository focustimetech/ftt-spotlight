import classNames from 'classnames'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import {
    Avatar,
    Menu,
    MenuItem,
    Tooltip
} from '@material-ui/core'

import { logout } from '../../actions/authActions'
import { IUser } from '../../types/auth'

import { LoadingMenuItem } from '../Form/LoadingMenuItem'
import { NavItem } from '../Sidebar/NavItem'

interface IReduxProps {
    currentUser: IUser
    logout: () => Promise<any>
}

export interface IAccountWidgetProps {
    //
}
interface IProps extends IReduxProps {
    onSignOut: (callback?: () => void) => void
}

interface IState {
    loadingSignOut: boolean
    menuRef: any
}

class AccountWidget extends React.Component<IAccountWidgetProps & IReduxProps, IState> {
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
        let profileLink: string
        if (this.props.currentUser.account_type === 'staff') {
            profileLink = `/staff/${this.props.currentUser.details.id}`
        } else if (this.props.currentUser.account_type === 'student') {
            profileLink = `/students/${this.props.currentUser.details.id}`
        }

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
                        <h3>
                            {this.props.currentUser.display_name}
                            {this.props.currentUser.account_type === 'sysadmin' && (
                                <Tooltip title='Systems Admin' placement='left'>
                                    <span className='sysadmin_badge' />
                                </Tooltip>
                            )}
                        </h3>
                        <h5>{this.props.currentUser.display_role}</h5>
                    </div>
                    {profileLink && (
                        <Link to={profileLink}><MenuItem onClick={() => this.handleClose()}>Profile</MenuItem></Link>
                    )}
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
