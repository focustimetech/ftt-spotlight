import axios, { AxiosResponse, CancelTokenSource } from 'axios'
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
import { SearchBuffer } from '../../utils/searchBuffer'

import Drawer, { DrawerContent, DrawerTitle } from '../Modals/Drawer'
import NavItem from './NavItem'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'

interface ISearchWidgetProps {
    orientation: Orientation
    variant: 'drawer' | 'bar'
}

interface IState {
    cancelTokenSource: CancelTokenSource
    open: boolean
    loading: boolean
    error: string
    value: string
    results: ISearchResults
}

class SearchWidget extends React.Component<ISearchWidgetProps, IState> {
    state: IState = {
        cancelTokenSource: null,
        open: false,
        loading: false,
        error: null,
        value: '',
        results: {}
    }

    searchBuffer: SearchBuffer<ISearchResults> = new SearchBuffer(6)

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        this.setState({ value }, () => {
            this.search(value)
        })
    }

    search = (query: string) => {
        if (this.searchBuffer.hasKey(query) || this.state.value.length === 0) {
            return
        }
        if (this.state.cancelTokenSource) {
            this.state.cancelTokenSource.cancel()
        }
        const cancelTokenSource: CancelTokenSource = axios.CancelToken.source()
        this.setState({ cancelTokenSource, loading: true, error: null }, () => {
            const searchParams: Record<string, string> = { q: query }

            API.get(`/search/${new URLSearchParams(searchParams).toString()}`).then((res: AxiosResponse<ISearchResults>) => {
                this.searchBuffer.push(query, res.data)
                this.setState({ loading: false })
            }, (error: any) => {
                this.setState({ loading: false, error: error.message })
            })
        })
    }

    render() {
        const errored: boolean = Boolean(this.state.error)
        const searchResults: ISearchResults = this.searchBuffer.retrieve(this.state.value) || {}

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
                            <SearchResults results={searchResults} />
                        )}
                    </DrawerContent>
				</Drawer>
            </div>
        )
    }
}

export default SearchWidget
