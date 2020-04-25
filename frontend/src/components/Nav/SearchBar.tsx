import classNames from 'classnames'
import React from 'react'

import {
    Icon,
    IconButton,
    InputBase,
    Paper
} from '@material-ui/core'

import Flexbox from '../Layout/Flexbox'

interface IState {
    value: string
    open: boolean
}

interface ISearchBarProps {
    loading: boolean
    onChange: (value: string) => void
}

class SearchBar extends React.Component<ISearchBarProps, IState> {
    state: IState = {
        value: '',
        open: false
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        this.setState({ value })
        this.props.onChange(value)
    }

    handleResetValue = () => {
        this.setState({ value: '' })
    }

    render() {
        const open: boolean = this.state.value.length > 0

        return (
            <Paper className={classNames('search-bar', '--on-primary', { '--open': open })} elevation={open ? 2 : 0}>
                <Flexbox
                    // padding
                    justifyContent='space-between'
                    className={classNames('search-bar__entry')}
                >
                    <Flexbox>
                        <IconButton size='small'><Icon>search</Icon></IconButton>
                        <InputBase
                            className='search-bar__input'
                            value={this.state.value}
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
                        <IconButton size='small' onClick={() => null}>
                            <Icon>arrow_right</Icon>
                        </IconButton>
                    </Flexbox>
                </Flexbox>
            </Paper>
        )
    }
}

export default SearchBar
