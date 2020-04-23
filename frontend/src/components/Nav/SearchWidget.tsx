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

import Drawer, { DrawerContent, DrawerTitle } from '../Modals/Drawer'
import NavItem from './NavItem'

interface ISearchGroup {
    value: string
    label: string
}

interface ISearchResults {
    students: any[],
    staff: any[],
    courses: any[],
    clusters: any[],
    [key: string]: any
}

interface IState {
    open: boolean
    loading: boolean
    value: string
    searchResults: ISearchResults
}

const searchGroups: ISearchGroup[] = [
    { value: 'students', label: 'Students' },
    { value: 'staff', label: 'Staff' },
    { value: 'courses', label: 'Courses' },
    { value: 'clusters', label: 'Clusters' },
]

const emptySearchResults: ISearchResults = {
    students: [],
    staff: [],
    courses: [],
    clusters: []
}

class SearchWidget extends React.Component<{}, IState> {
    state: IState = {
        open: false,
        loading: false,
        value: '',
        searchResults: emptySearchResults
    }

    constructor(props: any) {
        super(props)
        this.escFunction = this.escFunction.bind(this)
    }

    handleClickOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        this.setState({ value })
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

    render() {
        const resultCount: number = this.state.searchResults ? (
            searchGroups.reduce((count: number, itemGroup: ISearchGroup) => {
                return count + this.state.searchResults[itemGroup.value].length
            }, 0)
        ) : 0

        return (
            <div>
                <NavItem title='Search' icon='search' onClick={this.handleClickOpen} />
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
