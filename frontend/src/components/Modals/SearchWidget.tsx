import * as React from 'react'
import ContentLoader from 'react-content-loader'
import { Link } from 'react-router-dom'
import axios from 'axios'

import {
    Drawer,
    Fade,
    Grow,
    Icon,
    IconButton,
    List,
    ListItem,
    Slide,
    TextField
} from '@material-ui/core'

import { EmptyStateIcon } from '../EmptyStateIcon'
import { NavItem } from '../Sidebar/NavItem'

interface ModalItem {
    value: string
    type: string
    url: string
}

interface ModalItemGroup {
    label: string
    values: ModalItem[]
}

interface IState {
    open: boolean
    loading: boolean
    searchQuery: string
    searchResults: ModalItemGroup[]
}

interface IProps {}

export class SearchWidget extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.escFunction = this.escFunction.bind(this)
    }

    state: IState = {
        open: false,
        loading: false,
        searchQuery: '',
        searchResults: []
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
            this.setState({ loading: true }, () => {
                axios.get(`http://localhost:8000/api/search?query=${query}`)
                .then(res => {
                    // Wait to show results until the query matches what was typed in.
                    if (res.data.query === this.state.searchQuery) {
                        const results: ModalItemGroup[] = res.data.results
                        this.setState({
                            searchResults: results,
                            loading: false
                        })
                    }
                })
            })
        } else {
            this.setState({
                searchResults: [],
                loading: false
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
            this.state.searchResults.reduce((count: number, itemGroup: ModalItemGroup) => {
                return count + itemGroup.values.length
            }, 0)
        ) : 0

        console.log('searchQuery:', this.state.searchQuery)
        console.log('loading', this.state.loading)
        console.log('resultCount:', resultCount)

        return (
            <>
                <NavItem title='Search' icon='search' onClick={this.handleClickOpen} />
                <Drawer open={this.state.open}>
					<div className='sidebar_modal search_modal items_modal'>
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
                                autoComplete='off'
                            />
                        </div>
                        <div className='sidebar_modal__content items_modal__content'>
                            <Grow in={!this.state.loading && resultCount > 0} timeout={{enter: 200, exit: 0}}>
                                <div className='content-inner'>
                                    {this.state.searchResults.map((itemGroup: ModalItemGroup) => (
                                        itemGroup.values.length > 0 && (
                                            <>
                                                <h4 className='items-group_header'>{itemGroup.label}</h4>
                                                <List className='items-group_list'>{
                                                    itemGroup.values.map((modalItem, index: number) => {
                                                        return (
                                                            <Link to={`/${modalItem.url}`} onClick={this.handleClose}>
                                                                <ListItem key={index} className='items-group_list__item'>{modalItem.value}</ListItem>
                                                            </Link>
                                                        )
                                                    })
                                                }</List>
                                            </>
                                        )
                                    ))}
                                </div>
                            </Grow>
                            <Fade in={this.state.loading} timeout={{enter: 200, exit: 0}}>
                                <div className='items_modal__content-loader'>
                                    <ContentLoader width={500} height={436}>
                                        <rect x='64' y='0' rx='4' ry='4' height='24' width='96' />
                                        <rect x='64' y='40' rx='4' ry='4' height='36' width='400' />
                                        <rect x='64' y='84' rx='4' ry='4' height='36' width='400' />
                                        <rect x='64' y='128' rx='4' ry='4' height='36' width='400' />
                                        <rect x='64' y='180' rx='4' ry='4' height='24' width='160' />
                                        <rect x='64' y='220' rx='4' ry='4' height='36' width='400' />
                                        <rect x='64' y='264' rx='4' ry='4' height='36' width='400' />
                                        <rect x='64' y='308' rx='4' ry='4' height='36' width='400' />
                                        <rect x='64' y='360' rx='4' ry='4' height='24' width='80' />
                                        <rect x='64' y='400' rx='4' ry='4' height='36' width='400' />
                                    </ContentLoader>
                                </div>
                            </Fade>
                            {!this.state.loading && resultCount === 0 && this.state.searchQuery.length > 0 && (
                                <EmptyStateIcon variant='search'>
                                    <h2>No search results found</h2>
                                    <h3>Try again searching something else.</h3>
                                </EmptyStateIcon>
                            )}
                        </div>
					</div>
				</Drawer>
            </>
        )
    }
}