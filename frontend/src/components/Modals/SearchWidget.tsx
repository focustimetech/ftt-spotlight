import * as React from 'react'
import axios from 'axios'

import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import TextField from '@material-ui/core/TextField';

import { EmptyStateIcon } from '../EmptyStateIcon'
import { NavItem } from '../Sidebar/NavItem'



type QueryState = 'searching' | 'idle'

interface SearchItem {
    value: string
    type: string
    url: string
}

interface SearchGroup {
    label: string
    values: SearchItem[]
}

interface IState {
    open: boolean
    queryState: QueryState
    searchQuery: string
    searchResults: SearchGroup[] | null
}

interface IProps {}

export class SearchWidget extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.escFunction = this.escFunction.bind(this)
    }

    state: IState = {
        open: false,
        queryState: 'idle',
        searchQuery: '',
        searchResults: null
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
        if (query.length > 0) {
            this.setState({ queryState: 'searching' }, () => {
                axios.get(`http://localhost:8000/api/search?query=${query}`)
                .then(res => {
                    // Wait to show results until the query matches what was typed in.
                    if (res.data.query === query) {
                        const results: SearchGroup[] = res.data.results
                        this.setState({
                            searchResults: results,
                            queryState: 'idle'
                        })
                    }
                })
            })
        } else {
            this.setState({
                searchResults: []
            })
        }
    }

    escFunction = (event: any) => {
        if (event.keyCode === 27) {
            this.setState({ open: false })
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.escFunction, false)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.escFunction, false)
    }

    render () {
        const resultCount: number = this.state.searchResults ? (
            this.state.searchResults.reduce((count: number, searchGroup: SearchGroup) => {
                return count + searchGroup.values.length
            }, 0)
        ) : 0

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
                            {this.state.queryState === 'searching' && <p>Loading...</p>}
                        </div>
                        <div className='sidebar_modal__content search_modal__content'>
                            {this.state.searchResults !== null && this.state.searchQuery.length > 0 && (
                                resultCount > 0 ? (
                                    <div className='content-inner'>{
                                        this.state.searchResults.map((searchGroup: SearchGroup) => {
                                            return (
                                                searchGroup.values.length > 0 && (
                                                    <>
                                                        <h4 className='search-group_header'>{searchGroup.label}</h4>
                                                        <List className='search-group_list'>{
                                                            searchGroup.values.map((searchItem) => {
                                                                return (
                                                                    <a href={searchItem.url}>
                                                                        <ListItem className='search-group_list__item'>{searchItem.value}</ListItem>
                                                                    </a>
                                                                )
                                                            })
                                                        }</List>
                                                    </>
                                                )
                                            )
                                        })
                                    }</div>
                                ) : (
                                    <EmptyStateIcon variant='search'>
                                        <h2>No search results found</h2>
                                        <h3>Try again searching something else.</h3>
                                    </EmptyStateIcon>
                                )
                            )}
                        </div>
					</div>
				</Drawer>
            </>
        )
    }
}