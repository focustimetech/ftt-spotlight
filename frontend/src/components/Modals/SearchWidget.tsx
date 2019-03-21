import * as React from 'react'

import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import { NavItem } from '../Sidebar/NavItem'

interface IState {
    open: boolean
    searchQuery: string
}

export class SearchWidget extends React.Component {
    state = {
        open: false,
        searchQuery: ''
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
                <NavItem title='Search' icon='search' onClick={this.handleClickOpen} />
                <Drawer open={this.state.open}>
					<div className='sidebar_modal'>
                        <IconButton onClick={this.handleClose}><Icon>alarm</Icon></IconButton>
						<h4>Search</h4>
					</div>
				</Drawer>
            </>
        )
    }
}