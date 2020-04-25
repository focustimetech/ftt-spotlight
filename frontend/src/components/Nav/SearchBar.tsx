import classNames from 'classnames'
import React from 'react'

import {
    Icon,
    IconButton,
    InputBase,
    Paper
} from '@material-ui/core'

import Flexbox from '../Layout/Flexbox'

const truncateSearchResults = () => {
    //
}

interface IState {
    value: string
    open: boolean
}

interface ISearchBarProps {
    loading: boolean
    value?: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onExpand?: () => void
}

class SearchBar extends React.Component<ISearchBarProps, IState> {
    state: IState = {
        value: '',
        open: false
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        this.setState({ value })
        this.props.onChange(event)
    }

    handleResetValue = () => {
        this.setState({ value: '' })
    }

    render() {
        return (
            <Paper className={classNames('search-bar', '--on-primary')} elevation={2}>
                <Flexbox
                    justifyContent='space-between'
                    className={classNames('search-bar__entry')}
                >
                    <Flexbox className='search-bar__input-container'>
                        <IconButton size='small'><Icon>search</Icon></IconButton>
                        <InputBase
                            className='search-bar__input'
                            value={this.props.value || this.state.value}
                            onChange={this.handleChange}
                            placeholder='Search Spotlight'
                        />
                    </Flexbox>
                    <Flexbox>
                        {this.state.value.length > 0 && (
                            <IconButton size='small' onClick={() => this.handleResetValue()}>
                                <Icon>close</Icon>
                            </IconButton>
                        )}
                        {this.props.onExpand && (
                            <IconButton size='small' onClick={() => this.props.onExpand()}>
                                <Icon>arrow_right</Icon>
                            </IconButton>
                        )}
                    </Flexbox>
                </Flexbox>
            </Paper>
        )
    }
}

export default SearchBar
