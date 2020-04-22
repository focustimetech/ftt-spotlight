import Link from 'next/link'
import React from 'react'
import { connect } from 'react-redux'

import {
    Avatar,
    Menu,
    MenuItem,
    Typography
} from '@material-ui/core'

import { dispatchCurrentUser, logout } from '../../actions/authActions'
import { IUser } from '../../types/auth'
import { getDisplayRole } from '../../utils/user'

import { LoadingMenuItem } from '../Form/LoadingMenuItem'
import NavItem from './NavItem'

interface IReduxProps {
    currentUser: IUser
    dispatchCurrentUser: () => void
    logout: () => Promise<any>
}

export interface IAccountWidgetProps {
    onSignOut?: (callback?: () => void) => void
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

    handleClickOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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

    componentDidMount() {
        if (!this.props.currentUser) {
            this.props.dispatchCurrentUser()
        }
    }

    render() {
        const { menuRef } = this.state
        const menuOpen = Boolean(menuRef)
        const user: IUser = this.props.currentUser

        return (
            <div className='account-widget'>
                <NavItem title='Account' onClick={this.handleClickOpen}>
                    <Avatar className='account-widget__avatar' >{user ? user.avatar.initials : undefined}</Avatar>
                </NavItem>
                {user && (
                        <Menu
                            open={menuOpen}
                            anchorEl={menuRef}
                            onClose={() => this.handleClose()}
                        >
                            <div className='nav_account_details'>
                                <Typography variant='h6'>{user.name}</Typography>
                                <Typography variant='caption'>{getDisplayRole(user.accountType)}</Typography>
                            </div>
                            <Link href='profile'><MenuItem onClick={() => this.handleClose()}>Profile</MenuItem></Link>
                            <LoadingMenuItem
                                onClick={() => this.handleSignOut()}
                                loading={this.state.loadingSignOut}
                            >Sign Out</LoadingMenuItem>
                        </Menu>
                    )}
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    currentUser: state.auth.user
})
const mapDispatchToProps = { dispatchCurrentUser, logout }

export default connect(mapStateToProps, mapDispatchToProps)(AccountWidget)
