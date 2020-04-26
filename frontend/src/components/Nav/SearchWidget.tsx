import axios, { AxiosResponse } from 'axios'
import Link from 'next/link'
import React from 'react'

import {
    CircularProgress,
    TextField,
    Typography,
} from '@material-ui/core'

import { ISearchResults } from '../../types/components/search'
import { Orientation } from '../../types/layout'
import API from '../../utils/api'

import Drawer, { DrawerContent, DrawerTitle } from '../Modals/Drawer'
import NavItem from './NavItem'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'

interface ISearchWidgetProps {
    orientation: Orientation
    variant: 'drawer' | 'bar'
}

interface IState {
    open: boolean
    loading: boolean
    error: string
    value: string
    results: ISearchResults
}

class SearchWidget extends React.Component<ISearchWidgetProps, IState> {
    state: IState = {
        open: false,
        loading: false,
        error: null,
        value: '',
        results: {}
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
        this.search(value)
    }

    search = (query: string) => {
        console.log('token:', axios.CancelToken.source())
        this.setState({ loading: true, error: null })
        API.get(`/search/${query}`).then((res: AxiosResponse<ISearchResults>) => {
            this.setState({ loading: false, results: res.data })
        }, (error: any) => {
            this.setState({ loading: false, error: error.message })
        })
    }

    render() {
        const errored: boolean = Boolean(this.state.error)

        return (
            <div>
                {this.props.variant === 'bar' ? (
                    <SearchBar
                        value={this.state.value}
                        open={!this.state.open}
                        onChange={this.handleChange}
                        onExpand={this.handleOpen}
                        loading={this.state.loading}
                        results={this.state.results}
                    />
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
                            error={errored}
                            helperText={errored ? this.state.error : undefined}
                        />
                    </DrawerTitle>
                    <DrawerContent>
                        {this.state.loading ? (
                            <CircularProgress />
                        ) : (
                            <SearchResults results={this.state.results} />
                        )}
                    </DrawerContent>
				</Drawer>
            </div>
        )
    }
}

export default SearchWidget
