import * as React from 'react'

import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import { NavItem } from '../Sidebar/NavItem'
import { TextField } from '@material-ui/core';

interface IState {
    open: boolean
}

export class StarredWidget extends React.Component<{}, IState> {
    state = {
        open: false
    }

    handleClickOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    render (){
        return (
            <>
                <NavItem title='Starred' icon='star' onClick={this.handleClickOpen} />
                <Drawer open={this.state.open}>
					<div className='sidebar_modal starred_modal'>
                        <div className='sidebar_modal__header'>
                            <IconButton className='button_back' onClick={this.handleClose}><Icon>arrow_back</Icon></IconButton>
                            <h3>Starred</h3>
                        </div>
                        <div className='sidebar_modal__content'>
                            <p>Couldn't find anything...</p>
                        </div>
					</div>
				</Drawer>
            </>
        )
    }
}