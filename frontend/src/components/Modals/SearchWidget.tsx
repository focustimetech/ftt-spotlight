import * as React from 'react'

import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import { NavItem } from '../Sidebar/NavItem'
import { TextField } from '@material-ui/core';

interface SearchItem {
    content: string
}

interface SearchGroup {
    group: string
    items: SearchItem[]
}

interface IState {
    open: boolean
    searchQuery: string
    searchResults: SearchGroup[]
}

export class SearchWidget extends React.Component<{}, IState> {
    state = {
        open: false,
        searchQuery: '',
        searchResults: [] as SearchGroup[]
    }



    handleClickOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleChange = (event: any) => {
        this.setState({ searchQuery: event.target.value }, () => {
            this.search(this.state.searchQuery)
        })
    }

    search = (query: string) => {
        console.log(`search('${query}')`)
    }

    render (){
        return (
            <>
                <NavItem title='Search' icon='search' onClick={this.handleClickOpen} />
                <Drawer open={this.state.open}>
					<div className='sidebar_modal search_modal'>
                        <div className='sidebar_modal__header'>
                            <IconButton className='button_back' onClick={this.handleClose}><Icon>arrow_back</Icon></IconButton>
                            <TextField
                                name='search'
								type='text'
								placeholder='Search Spotlight'
								value={this.state.searchQuery}
								onChange={this.handleChange}
								margin='normal'
								variant='standard'
								autoFocus={true}
								fullWidth={true}
                            />
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