import classNames from 'classnames'
import React from 'react'

import {
    Avatar,
    Chip,
    CircularProgress,
    ClickAwayListener,
    FormHelperText,
    Grow,
    Icon,
    IconButton,
    InputBase,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    Tooltip,
    Typography
} from '@material-ui/core'
import { PopperProps } from '@material-ui/core/Popper'

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
    onRemove?: () => void
}

export interface ISelectItem<T> extends ISelectChipBase<T> {
    selected: boolean
}

interface IProps<T> {
    allowDuplicates?: boolean
    chips: Array<ISelectChip<T>>
    placeholder: string
    onCreateChip?: (chip: ISelectChip<T>) => void
    onRemoveChip: (index: number) => void
    onSearch?: (query: string) => void
    onSelect?: (item: ISelectItem<T>) => void
    onSubmit?: () => void
    validateChip?: (chip: ISelectChip<T>) => boolean
    formatChipLabel?: (label: string) => string
    loadNewChips?: boolean
    icon?: string
    queryResults?: Array<ISelectChipBase<T>>
    disabled?: boolean
    loading?: boolean
    helperText?: string
}

interface IState {
    inputValue: string
    resultsRef: PopperProps['anchorEl']
}

class ChipSelect<T> extends React.Component<IProps<T>, IState> {
    state: IState = {
        inputValue: '',
        resultsRef: null
    }

    handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const inputValue: string = event.target.value
        const searchable: boolean = Boolean(this.props.onSearch)
        this.setState({ inputValue })
        if (searchable) {
            this.props.onSearch(inputValue)
        }
    }

    handleInputFocus = (event?: React.FocusEvent<HTMLDivElement>) => {
        if (this.props.onSearch) {
            this.setState({ resultsRef: event.currentTarget })
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
        this.setState({ inputValue: clipboard }, () => {
            clipboard.split(',').forEach((stringValue: string) => {
                this.handleCreateChip({ value: null, label: stringValue })
            })
        })
    }

    handleSubmit = () => {
        if (this.props.chips.length === 0 && this.state.inputValue.length === 0) {
            return
        }
        this.props.onSubmit()
    }

    handleCreateChip = (chip?: ISelectChip<T>) => {
        if (!chip) {
            chip = { value: null, label: this.state.inputValue }
            this.setState({ inputValue: '' })
        }
        let { label } = chip
        if (this.props.disabled || !this.props.onCreateChip) {
            return
        }
        if (label === null) {
            label = this.state.inputValue
        }
        const newChip: ISelectChip<T> = {
            avatar: chip.avatar,
            value: chip.value,
            loading: this.props.loadNewChips,
            label: this.props.formatChipLabel ? this.props.formatChipLabel(label) : label
        }
        this.props.onCreateChip(newChip)
    }

    handleRemoveChip = (index: number, onRemove?: () => void) => {
        if (this.props.disabled) {
            return
        }
        this.props.onRemoveChip(index)
        if (onRemove) {
            onRemove()
        }
    }

    handleCloseResults = () => {
        this.setState({ resultsRef: null })
    }

    handleSelectQueryResult = (item: ISelectItem<T>) => {
        this.handleCreateChip({
            avatar: item.avatar,
            value: item.value,
            label: item.label
        })
        if (this.props.onSelect) {
            this.props.onSelect(item)
        }
    }

    render() {
        const searchable: boolean = Boolean(this.props.onSearch)
        const disabled: boolean = this.props.disabled || this.props.loading
        const resultsOpen: boolean = !disabled && searchable && Boolean(this.state.resultsRef) && this.state.inputValue.length > 0

        return (
            <ClickAwayListener onClickAway={this.handleCloseResults}>
                <div className='chip_select'>
                    <Paper>
                        <div className='chip_select__textfield'>
                            <div className='chip_select__actions'>
                                {this.props.onSearch && (
                                    <span><Icon>search</Icon></span>
                                )}
                                <InputBase
                                    className='chip_select__input'
                                    value={this.state.inputValue}
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                    placeholder={this.props.placeholder}
                                    disabled={disabled}
                                    onKeyDown={this.onKeyDown}
                                    onPaste={this.onPaste}
                                    autoFocus
                                />
                                {searchable || !this.props.onCreateChip ? (
                                    this.props.loading && (
                                        <div className='chip_select__loading'><CircularProgress size={24} /></div>
                                    )
                                ) : (
                                    <Tooltip title='Add (Enter)'>
                                        <LoadingIconButton loading={this.props.loading} disabled={this.props.disabled} onClick={() => this.handleCreateChip()}>
                                            <Icon>keyboard_return</Icon>
                                        </LoadingIconButton>
                                    </Tooltip>
                                )}
                            </div>
                        </div>
                    </Paper>
                    {this.props.helperText && (
                        <FormHelperText>{this.props.helperText}</FormHelperText>
                    )}
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
                                    onDelete={() => this.handleRemoveChip(index, chip.onRemove)}
                                />
                            )
                            return chip.title ? <Tooltip placement='bottom-start' title={chip.title}>{chipComponent}</Tooltip> : chipComponent
                        })}
                    </div>
                    <Popper
                        className='chip_select__popper'
                        anchorEl={this.state.resultsRef}
                        open={resultsOpen}
                        disablePortal
                        transition
                        placement='bottom'
                    >
                        {({ TransitionProps }) => (
                            <Grow {...TransitionProps}>
                                <Paper>
                                    <MenuList>
                                        {this.props.queryResults.length > 0 ? (
                                            this.props.queryResults.map((queryResult: ISelectItem<T>, index: number) => (
                                                <MenuItem selected={queryResult.selected} key={index} onClick={() => this.handleSelectQueryResult(queryResult)}>
                                                    {queryResult.avatar && (
                                                        <Avatar className={classNames('chip_avatar', `--${queryResult.avatar.color}`)}>
                                                            {queryResult.avatar.initials}
                                                        </Avatar>
                                                    )}
                                                    <span>{queryResult.label}</span>
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <Typography className='no_results'>No results found.</Typography>
                                        )}
                                    </MenuList>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>
            </ClickAwayListener>
        )
    }
}

export default ChipSelect
