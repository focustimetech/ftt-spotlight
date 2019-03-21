import * as React from 'react'

import Dialog from '@material-ui/core/Dialog'
import Switch from '@material-ui/core/Switch'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'

import { NavItem } from '../Sidebar/NavItem'

interface IState {
    open: boolean
}

export class CheckInWidget extends React.Component<{}, IState> {
    state = {
        open: false
    }

    handleClickOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    render() {
        return (
            <>
                <NavItem title='Check-in' icon='how_to_reg' onClick={this.handleClickOpen} />
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    className='check-in-modal'
                >
                    <div className='check-in-modal__header'>
                        <IconButton onClick={this.handleClose}><Icon>alarm</Icon></IconButton>
                        <h4>Student Check-in</h4>
                    </div>
                </Dialog>
            </>
        )
    }
}