import classNames from 'classnames'
import React from 'react'

import {
    Icon,
    IconButton,
    InputBase
} from '@material-ui/core'

import Flexbox from '../Layout/Flexbox'

interface IState {
    value: string
    loading: boolean
}

class SearchBar extends React.Component {
    state: IState = {
        value: '',
        loading: false
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        this.setState({ value })
    }

    handleResetValue = () => {
        this.setState({ value: '' })
    }

    render() {
        return (
            <Flexbox
                // padding
                justifyContent='space-between'
                className={classNames('search-bar', '--on-primary')}
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
        )
    }
}

export default SearchBar
