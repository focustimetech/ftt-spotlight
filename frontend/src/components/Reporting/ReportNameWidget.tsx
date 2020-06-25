/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * Depricated
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
import classNames from 'classnames'
import React from 'react'

import {
    CardActionArea,
    ClickAwayListener,
    FormHelperText,
    Tooltip,
    Typography
} from '@material-ui/core'

const INPUT_PLACEHOLDER = 'Report Name'

interface IProps {
    name: string
    onSubmit: (name: string) => void
}

interface IState {
    editing: boolean
    hiddenInputWidth: number
    name: string
    tooShort: boolean
}

class ReportNameWidget extends React.Component<IProps, IState> {
    state: IState = {
        editing: false,
        hiddenInputWidth: 0,
        name: this.props.name,
        tooShort: false
    }

    hiddenInputRef: any

/*
    constructor(props: IProps) {
        super(props)
        // this.hiddenInputRef = React.createRef()
    }
*/

    handleEsc = (event: any) => {
        if (event.keyCode === 27) {
            this.setState({ editing: false })
        }
    }

    handleChange = (event: any) => {
        this.setState({
            name: event.target.value,
            tooShort: false
        }, () => {
            this.setState({ hiddenInputWidth: this.hiddenInputRef.clientWidth })
        })
    }

    handleSubmit = (event: any) => {
        event.preventDefault()
        const submittedName: string = this.state.name.trim()
        if (submittedName.length < 3) {
            this.setState({ tooShort: true })
            return
        }
        this.setState({ editing: false })
        this.props.onSubmit(submittedName)
    }

    handleClickAway = (event: any) => {
        if (this.state.editing) {
            this.handleSubmit(event)
        }
    }

    handleEdit = () => {
        this.setState({
            editing: true,
            tooShort: false,
            name: this.props.name,
        }, () => {
            this.setState({ hiddenInputWidth: this.hiddenInputRef.clientWidth })
        })
    }

    componentDidMount() {
        // Add event listener for escape key press
        document.addEventListener('keydown', this.handleEsc, false)
    }

    componentWillMount() {
        document.removeEventListener('keydown', this.handleEsc, false)
    }

    render() {
        return (
            <div className={classNames('report_name_widget', { '--edit': this.state.editing, '--error': this.state.tooShort })}>
                {this.state.editing ? (
                    <ClickAwayListener onClickAway={this.handleClickAway}>
                        <Typography variant='h4'>
                            <span className='report_name_widget__hidden' ref={(element: any) => this.hiddenInputRef = element}>
                                {this.state.name.length > 0 ? this.state.name : INPUT_PLACEHOLDER}
                            </span>
                            <form onSubmit={this.handleSubmit}>
                                <input
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    className='report_name_widget__input'
                                    style={{ width: this.state.hiddenInputWidth }}
                                    autoFocus
                                    placeholder={INPUT_PLACEHOLDER}
                                />
                                {this.state.tooShort && (
                                    <FormHelperText className='report_name_widget__helper'>Report name must be at least 3 characters long.</FormHelperText>
                                )}
                            </form>
                        </Typography>
                    </ClickAwayListener>
                ) : (
                    <Tooltip title='Rename Report'>
                        <CardActionArea onClick={() => this.handleEdit()}>
                            <Typography variant='h4'>{this.props.name}</Typography>
                        </CardActionArea>
                    </Tooltip>
                )}
            </div>
        )
    }
}

export { ReportNameWidget }
