import Link from 'next/link'
import React from 'react'
import { connect } from 'react-redux'

import {
    IconButton,
    Menu,
    MenuItem,
    PopoverOrigin,
    PopoverPosition,
    Tooltip,
    Typography
} from '@material-ui/core'

import { dispatchCurrentUser, logout } from '../../../actions/authActions'
import { IUser } from '../../../types/auth'
import { getDisplayRole, getProfileLink } from '../../../utils/user'

import Avatar from '../../Avatar'
import { LoadingMenuItem } from '../../Form/Components/LoadingMenuItem'
import NavItem from '../NavItem'

interface IReduxProps {
    currentUser: IUser
    dispatchCurrentUser: () => void
    logout: () => Promise<any>
}

export interface IAccountWidgetProps {
    orientation: 'vertical' | 'horizontal'
    onSignOut?: (callback?: () => void) => void
}

interface IState {
    currentUser: IUser
    loading: boolean
    menuRef: any
}

class AccountWidget extends React.Component<IAccountWidgetProps & IReduxProps, IState> {
    state: IState = {
        currentUser: null,
        loading: false,
        menuRef: null
    }

    handleClickOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!this.props.currentUser) {
            return
        }
        this.setState({ menuRef: event.currentTarget })
    }

    handleClose = () => {
        this.setState({ menuRef: null })
    }

    handleSignOut = () => {
        this.setState({ loading: true, currentUser: this.props.currentUser })
        this.props.logout()
    }

    componentDidMount() {
        if (!this.props.currentUser) {
            this.props.dispatchCurrentUser()
        }
    }

    render() {
        const { menuRef } = this.state
        const menuOpen = Boolean(menuRef)
        const user: IUser = this.state.currentUser || this.props.currentUser
        const avatar = user ? user.avatar : undefined
        const anchorOrigin: PopoverOrigin = { vertical: 'bottom', horizontal: 'right' }
        const transformOrigin: PopoverOrigin = this.props.orientation === 'horizontal'
            ? { vertical: 'top', horizontal: 'right' }
            : { vertical: 'bottom', horizontal: 'left' }
            console.log('AccountWidget.user:', user)
        return (
            <div>
                <NavItem title='My Account' onClick={this.handleClickOpen} orientation={this.props.orientation}>
                    <Avatar size='medium' avatar={avatar} />
                </NavItem>
                {user && (
                    <Menu
                        open={menuOpen}
                        anchorEl={menuRef}
                        getContentAnchorEl={null}
                        anchorOrigin={anchorOrigin}
                        transformOrigin={transformOrigin}
                        onClose={() => this.handleClose()}
                    >
                        <div className='nav_account_details'>
                            <Typography variant='h6'>{user.name}</Typography>
                            <Typography variant='caption'>{getDisplayRole(user.accountType)}</Typography>
                        </div>
                        {user.accountType !== 'sysadmin' && user.active && (
                            <Link href='teachers/[teacherId]' as={getProfileLink(user)}>
                                <MenuItem onClick={() => this.handleClose()}>Profile</MenuItem>
                            </Link>
                        )}
                        <LoadingMenuItem
                            onClick={() => this.handleSignOut()}
                            loading={this.state.loading}
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
