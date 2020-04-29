import React from 'react'
import { connect } from 'react-redux'

import { dispatchCurrentUser } from '../../actions/authActions'
import { RootState } from '../../store'
import { IUser } from '../../types/auth'

import Drawer, { DrawerContent, DrawerTitle } from '../Modals/Drawer'
import NavItem from './NavItem'
import { Orientation } from '../../types/layout'

interface IReduxProps {
    currentUser: IUser
}

interface IState {
    open: boolean
}

interface ISettingsWidgetProps {
    orientation: Orientation
}

class SettingsWidget extends React.Component<ISettingsWidgetProps, IState> {
    state: IState = {
        open: false
    }

    handleOpen = () => {
        /*
        if (!this.props.currentUser) {
            return
        }
        */
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    render() {
        return (
            <div>
                <NavItem
                    onClick={this.handleOpen}
                    title='Settings'
                    icon='settings'
                    orientation={this.props.orientation}
                />
                <Drawer open={this.state.open}>
                    <DrawerTitle title='Settings' onClose={this.handleClose} />
                    <DrawerContent>
                        <span>Settings are found here.</span>
                    </DrawerContent>
                </Drawer>
            </div>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    currentUser: state.auth.user
})

const mapDispatchToProps = { dispatchCurrentUser }

export default connect(mapStateToProps, mapDispatchToProps)(SettingsWidget)
