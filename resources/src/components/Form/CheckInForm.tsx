import * as React from 'react'
import { connect } from 'react-redux'

import {
    CircularProgress,
    Dialog,
    Icon,
    IconButton,
    InputAdornment,
    TextField
} from '@material-ui/core'

import { checkIn } from '../../actions/checkinActions'
import { ICheckInRequest } from '../../types/checkin'
import { ISnackbar, queueSnackbar } from '../../actions/snackbarActions'
import { ModalSection } from '../ModalSection'

interface ReduxProps {
    checkIn: (request: ICheckInRequest) => Promise<any>
    queueSnackbar: (snackbar: ISnackbar) => void
}

interface IProps extends ReduxProps {
    dateTime?: string
    didCheckIn?: () => Promise<any>
}

interface IState {
    errored: boolean
    loadingCheckIn: boolean
    inputValue: string
}

class CheckInForm extends React.Component<IProps, IState> {
    state: IState = {
        errored: false,
        loadingCheckIn: false,
        inputValue: ''
    }

    handleChange = (event: any) => {
        if (this.state.loadingCheckIn)
            return
        this.setState({
            inputValue: event.target.value,
            errored: false
        })
    }

    handleSubmit = (event: any) => {
        event.preventDefault()
        this.setState({ loadingCheckIn: true })
        const request: ICheckInRequest = {
            student_numbers: this.state.inputValue.split(','),
            date_time: this.props.dateTime
        }
        this.props.checkIn(request)
            .then((res: any) => {
                if (this.props.didCheckIn) {
                    this.props.didCheckIn().then(() => {
                        this.props.queueSnackbar({ message: 'Checked in students successfully.' })
                        this.setState({
                            loadingCheckIn: false,
                            inputValue: ''
                        })
                    })
                } else {
                    this.props.queueSnackbar({ message: 'Checked in students successfully.' })
                    this.setState({
                        loadingCheckIn: false,
                        inputValue: ''
                    })
                }
            })
            .catch((error: any) => {
                this.setState({
                    errored: true,
                    loadingCheckIn: false
                })
            })
    }

    render() {
        return (
            <ModalSection
                icon='keyboard'
                title='Scan or Enter'
            >
                <form className='check-in-input' onSubmit={this.handleSubmit}>
                    <TextField
                        name='check-in'
                        type='text'
                        placeholder='Enter Student Numbers'
                        variant='outlined'
                        value={this.state.inputValue}
                        onChange={this.handleChange}
                        margin='normal'
                        autoFocus
                        fullWidth
                        helperText={this.state.errored ? 'Please try again' : 'Single entry or comma-separated list'}
                        error={this.state.errored}
                        InputProps={{
                            endAdornment: this.state.loadingCheckIn ? (
                                <div><CircularProgress size={24} /></div>
                            ) : (
                                <InputAdornment position='end'>
                                    <IconButton disabled={this.state.inputValue.length === 0} onClick={this.handleSubmit}>
                                        <Icon>keyboard_return</Icon>
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </form>
            </ModalSection>
        )
    }
}

const mapDispatchToProps = {
    checkIn,
    queueSnackbar
}

export default connect(null, mapDispatchToProps)(CheckInForm)
