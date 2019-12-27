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

interface ISelectChip<T> {
    key: string | number
    label: string
    value: T
    loading: boolean
    title?: string
    icon?: string
    avatar?: IAvatar
}

interface IProps<T> {
    chips: Array<ISelectChip<T>>
    helperText?: string
    readOnly?: boolean
    placeholder: string
    onRemoveChip?: (key: string | number) => void
    onCreateChip?: (chip: ISelectChip<T>) => void
    onSearch?: (query: string) => void
    onSubmit?: () => void
    icon?: string
    queryState: undefined | 'loading' | 'idle'
    uploadState: undefined | 'loading' | 'idle'
    queryResults: any[]
    searchable?: boolean
}

interface IState {
    inputValue: string
    duplicateKey: string | number
}

class ChipSelect<T> extends React.Component<IProps<T>, IState> {
    state: IState = {
        inputValue: '',
        duplicateKey: null
    }

    handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const inputValue: string = event.target.value
        this.setState({ inputValue, duplicateKey: null })
        if (this.props.searchable) {
            this.props.onSearch(inputValue)
        }
    }

    onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (this.props.uploadState === 'loading') {
            return
        }
        if (event.keyCode === 8) { // Backspace
            if (this.state.inputValue.length === 0) {
                this.handleRemoveChip(this.props.chips[this.props.chips.length - 1].key)
            }
        } else if ([188, 13, 32].includes(event.keyCode)) { // Comma, Enter, Space
            event.preventDefault()
            if (event.ctrlKey && event.keyCode === 13) { // Enter + Ctrl
                this.handleSubmit()
            } else if (this.state.inputValue.length > 0) {
                this.handleCreateChip()
            }
        }
    }

    onPaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
        const clipboard: string = event.clipboardData.getData('Text')
        this.handleCreateChip(clipboard)
        event.preventDefault()
        this.setState({ inputValue: '' })
    }

    handleSubmit = () => {
        if (this.props.chips.length === 0 && this.state.inputValue.length === 0) {
            return
        }
        this.props.onSubmit()
    }

    handleCreateChip = (key?: string | number, value?: T) => {
        if (this.props.readOnly) {
            return
        }
        const newKey: string | number = key || this.state.inputValue
        if (!key) {
            this.setState({ inputValue: '' })
        }
        const label: string = String(key)
        const isDuplicate: boolean = this.props.chips.some((chip: ISelectChip<T>) => {
            return String(chip.key) === label
        })
        if (isDuplicate) {
            this.setState({ duplicateKey: key })
            return
        }
        const newChip: ISelectChip<T> = {
            key,
            value,
            label,
            loading: false
        }
        this.props.onCreateChip(newChip)
    }

    handleRemoveChip = (key: string | number) => {
        if (this.props.readOnly) {
            return
        }
        this.setState({ duplicateKey: null })
        this.props.onRemoveChip(key)
    }

    render() {
        return (
            <Paper>
                <div className='chip-textfield'>
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
                                key={chip.key}
                                avatar={avatar}
                                label={chip.label}
                                onDelete={() => this.handleRemoveChip(chip.key)}
                            />
                        )
                        return chip.title ? <Tooltip placement='bottom-start' title={chip.title}>{chipComponent}</Tooltip> : chipComponent
                    })}
                    <div className='chip-textfield__actions'>
                        <Slide direction='left' in={this.props.queryState === 'loading'}>
                            <CircularProgress size={24} />
                        </Slide>
                        <InputBase
                            className='chip-textfield__input'
                            value={this.state.inputValue}
                            onChange={this.handleInputChange}
                            placeholder={this.props.placeholder}
                            disabled={this.props.uploadState === 'loading'}
                            onKeyDown={this.onKeyDown}
                            onPaste={this.onPaste}
                            autoFocus
                        />
                        <Tooltip title='Add (Enter)'>
                            <IconButton disabled={this.props.uploadState === 'loading'} onClick={() => this.handleCreateChip()}>
                                <Icon>keyboard_return</Icon>
                            </IconButton>
                        </Tooltip>
                        {this.props.onSubmit && (
                            <>
                                <Divider className='chip-textfield__divider' orientation='vertical' />
                                <Tooltip title='Submit (Ctrl + Enter)'>
                                    <LoadingIconButton
                                        color='primary'
                                        loading={this.props.uploadState === 'loading'}
                                        onClick={() => this.handleSubmit()}
                                        disabled={this.props.chips.length === 0 && this.state.inputValue.length === 0}
                                    >
                                        <Icon>{this.props.icon || 'cloud_upload'}</Icon>
                                    </LoadingIconButton>
                                </Tooltip>
                            </>
                        )}
                    </div>
                    <Collapse in={this.props.queryState === 'idle' && this.props.queryResults.length > 0}>
                        <h6>Query results are here.</h6>
                    </Collapse>
                </div>
            </Paper>
        )
    }
}

export default ChipSelect
