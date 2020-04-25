import axios from 'axios'
import React from 'react'
import ContentLoader from 'react-content-loader'
import { Link } from 'react-router-dom'

import {
    Fade,
    Grow,
    Icon,
    IconButton,
    List,
    ListItem,
    Slide,
    TextField,
    Typography
} from '@material-ui/core'

import { Orientation } from '../../types/layout'

import Drawer, { DrawerContent, DrawerTitle } from '../Modals/Drawer'
import NavItem from './NavItem'
import SearchBar from './SearchBar'

interface ISearchWidgetProps {
    orientation: Orientation
    variant: 'drawer' | 'bar'
}

interface IState {
    open: boolean
    loading: boolean
    value: string
    results: any[]
}


class SearchWidget extends React.Component<ISearchWidgetProps, IState> {
    state: IState = {
        open: false,
        loading: false,
        value: '',
        results: []
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        this.setState({ value })
    }

    render() {
        return (
            <div>
                {this.props.variant === 'bar' ? (
                    <SearchBar value={this.state.value} onChange={this.handleChange} onExpand={this.handleOpen} loading={this.state.loading} />
                ) : (
                    <NavItem title='Search' icon='search' onClick={this.handleOpen} orientation={this.props.orientation} />
                )}
                <Drawer open={this.state.open}>
                    <DrawerTitle onClose={this.handleClose}>
                        <TextField
                            name='search'
                            type='text'
                            placeholder='Search Spotlight'
                            value={this.state.value}
                            onChange={this.handleChange}
                            margin='normal'
                            variant='standard'
                            autoFocus={true}
                            fullWidth={true}
                            autoComplete='off'
                        />
                    </DrawerTitle>
                    <DrawerContent>
                        <Typography variant='body1'>Hello world</Typography>
                    </DrawerContent>
				</Drawer>
            </div>
        )
    }
}

export default SearchWidget
