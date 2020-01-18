import classNames from 'classnames'
import React from 'react'

import {
    Avatar,
    Chip,
    CircularProgress,
    Collapse,
    Divider,
    Icon,
    IconButton,
    InputBase,
    Paper,
    Slide,
    Tooltip
} from '@material-ui/core'

import { IAvatar } from '../types/app'

import { LoadingIconButton } from './Form/LoadingIconButton'

export interface ISelectChipBase<T> {
    value: T
    label: string
    avatar?: IAvatar
}

export interface ISelectChip<T> extends ISelectChipBase<T> {
    loading?: boolean
    title?: string
    icon?: string
}

interface IProps<T> {
    chips: Array<ISelectChip<T>>
    helperText?: string
    placeholder: string
    onCreateChip: (chip: ISelectChip<T>) => void
    onRemoveChip: (index: number) => void
    onSearch?: (query: string) => void
    onSubmit?: () => void
    validateChip?: (chip: ISelectChip<T>) => boolean
    formatChipLabel?: (label: string) => string
    loadNewChips?: boolean
    icon?: string
    queryResults?: ISelectChipBase<T[]>
    searchable?: boolean
    disabled?: boolean
    loading?: boolean
}

interface IState {
    inputValue: string
}

class ChipSelect<T> extends React.Component<IProps<T>, IState> {
    state: IState = {
        inputValue: '',
    }

    handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const inputValue: string = event.target.value
        this.setState({ inputValue })
        if (this.props.searchable) {
            this.props.onSearch(inputValue)
        }
    }

    onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (this.props.disabled) {
            return
        }
        if ([188, 13, 32].includes(event.keyCode)) { // Comma, Enter, Space
            event.preventDefault()
            if (this.state.inputValue.length > 0) {
                this.handleCreateChip()
            }
        }
    }

    onPaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
        event.preventDefault()
        const clipboard: string = event.clipboardData.getData('Text')
        clipboard.split(',').forEach((stringValue: string) => {
            this.handleCreateChip(stringValue)
        })
        this.setState({ inputValue: '' })
    }

    handleSubmit = () => {
        if (this.props.chips.length === 0 && this.state.inputValue.length === 0) {
            return
        }
        this.props.onSubmit()
    }

    handleCreateChip = (label: string = null, value: T = null) => {
        if (this.props.disabled) {
            return
        }
        if (label === null) {
            label = this.state.inputValue
        }
        const newChip: ISelectChip<T> = {
            value,
            loading: this.props.loadNewChips,
            label: this.props.formatChipLabel ? this.props.formatChipLabel(label) : label
        }
        this.props.onCreateChip(newChip)
    }

    handleRemoveChip = (index: number) => {
        if (this.props.disabled) {
            return
        }
        this.props.onRemoveChip(index)
    }

    render() {
        return (
            <>
                <div className='chips_container'>
                    {this.props.chips.map((chip: ISelectChip<T>, index: number) => {
                        const isDuplicate: boolean = false
                        const avatar: JSX.Element = chip.avatar ? (
                            chip.loading ? (
                                <Avatar><CircularProgress size={24} /></Avatar>
                            ) : (
                                <Avatar className={classNames('chip_avatar', {[`--${chip.avatar.color}`]: chip.avatar.color })}>
                                    {chip.avatar.initials}
                                </Avatar>
                            )
                        ) : undefined

                        const chipComponent: JSX.Element = (
                            <Chip
                                className={classNames({'--duplicate': isDuplicate})}
                                key={index}
                                avatar={avatar}
                                label={chip.label}
                                onDelete={() => this.handleRemoveChip(index)}
                            />
                        )
                        return chip.title ? <Tooltip placement='bottom-start' title={chip.title}>{chipComponent}</Tooltip> : chipComponent
                    })}
                </div>
                <Paper>
                    <div className='chip-textfield'>
                        <div className='chip-textfield__actions'>
                            <Slide direction='left' in={this.props.loading}>
                                <CircularProgress size={24} />
                            </Slide>
                            {this.props.searchable && (
                                <span><Icon>search</Icon></span>
                            )}
                            <InputBase
                                className='chip-textfield__input'
                                value={this.state.inputValue}
                                onChange={this.handleInputChange}
                                placeholder={this.props.placeholder}
                                disabled={this.props.disabled}
                                onKeyDown={this.onKeyDown}
                                onPaste={this.onPaste}
                                autoFocus
                            />
                            <Tooltip title='Add (Enter)'>
                                <IconButton disabled={this.props.disabled} onClick={() => this.handleCreateChip()}>
                                    <Icon>keyboard_return</Icon>
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                </Paper>
            </>
        )
    }
}

export default ChipSelect
