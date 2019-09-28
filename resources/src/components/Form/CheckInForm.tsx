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
import { ISnackbar, queueSnackbar } from '../../actions/snackbarActions'
import { ModalSection } from '../ModalSection'

interface ReduxProps {
    checkIn: (input: string) => Promise<any>
    queueSnackbar: (snackbar: ISnackbar) => void
}

interface IProps extends ReduxProps {}

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
        this.props.checkIn(this.state.inputValue)
            .then((res: any) => {
                this.setState({
                    loadingCheckIn: false,
                    inputValue: ''
                })
                this.props.queueSnackbar({ message: 'Checked in students successfully.' })
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
