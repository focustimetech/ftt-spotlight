import classNames from 'classnames'
import React from 'react'

import {
    CardActionArea,
    ClickAwayListener,
    Collapse,
    FormHelperText,
    Tooltip,
    Typography
} from '@material-ui/core'

// const INPUT_PLACEHOLDER = 'Report Name'

interface ITitleFieldProps {
    placeholder: string
    minimum?: number
    title: string
    value: string
    name: string
    onSubmit: (value: string) => void
}

interface ITitleFieldState {
    editing: boolean
    hiddenInputWidth: number
    value: string
    tooShort: boolean
}

class TitleField extends React.Component<ITitleFieldProps, ITitleFieldState> {
    state: ITitleFieldState = {
        editing: false,
        hiddenInputWidth: 0,
        value: this.props.value,
        tooShort: false
    }

    hiddenInputRef: HTMLSpanElement

    handleEsc = (event: KeyboardEvent) => {
        if (event.keyCode === 27) {
            this.setState({ editing: false })
        }
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        this.setState({
            value,
            tooShort: false
        }, () => {
            this.setState({ hiddenInputWidth: this.hiddenInputRef.clientWidth })
        })
    }

    handleSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
        if (event) {
            event.preventDefault()
        }
        const submittedValue: string = this.state.value.trim()
        if (submittedValue.length === 0) {
            this.setState({ editing: false })
            return
        }
        if (this.props.minimum && submittedValue.length < this.props.minimum) {
            this.setState({ tooShort: true })
            return
        }
        this.setState({ editing: false })
        this.props.onSubmit(submittedValue)
    }

    handleClickAway = (event: React.MouseEvent<Document, MouseEvent>) => {
        if (this.state.editing) {
            this.handleSubmit()
        }
    }

    handleEdit = () => {
        this.setState({
            editing: true,
            tooShort: false,
            value: this.props.value,
        }, () => {
            this.setState({ hiddenInputWidth: this.hiddenInputRef.clientWidth })
        })
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleEsc, false)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleEsc, false)
    }

    render() {
        return (
            <div className={classNames('title-field', { '--edit': this.state.editing, '--error': this.state.tooShort })}>
                {this.state.editing ? (
                    <ClickAwayListener onClickAway={this.handleClickAway}>
                        <Typography variant='h4'>
                            <span className='title-field__hidden' ref={(element) => this.hiddenInputRef = element}>
                                {this.state.value.length > 0 ? this.state.value : this.props.placeholder}
                            </span>
                            <form onSubmit={this.handleSubmit}>
                                <input
                                    value={this.state.value}
                                    name={this.props.name}
                                    onChange={this.handleChange}
                                    className='title-field__input'
                                    style={{ width: this.state.hiddenInputWidth }}
                                    autoFocus
                                    placeholder={this.props.placeholder}
                                />
                                <Collapse in={this.state.tooShort}>
                                    <FormHelperText className='title-field__helper'>Entry must be at least {this.props.minimum || '0'} characters long.</FormHelperText>
                                </Collapse>
                            </form>
                        </Typography>
                    </ClickAwayListener>
                ) : (
                    <Tooltip title={this.props.title}>
                        <CardActionArea onClick={() => this.handleEdit()}>
                            <Typography variant='h4'>{this.props.value}</Typography>
                        </CardActionArea>
                    </Tooltip>
                )}
            </div>
        )
    }
}

export default TitleField
