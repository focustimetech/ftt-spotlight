import * as React from 'react'
import { connect } from 'react-redux'
import * as classNames from 'classnames'

import {
    Avatar,
    Checkbox,
    CircularProgress,
    Dialog,
    Fade,
    Grow,
    Icon,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    Switch,
    TextField,
    Tooltip
} from '@material-ui/core'

import { NavItem } from '../Sidebar/NavItem'
import { EnhancedDialogTitle } from './EnhancedDialogTitle'
import { fetchCheckInStatus, enableAir, disableAir, checkIn } from '../../actions/checkinActions'
import { ICheckInStatus } from '../../types/checkin'
import { ISnackbar, queueSnackbar } from '../../actions/snackbarActions'

interface ReduxProps {
    checkInStatus: ICheckInStatus
    fetchCheckInStatus: () => any
    enableAir: () => any
    disableAir: () => any
    checkIn: (input: string) => Promise<any>
    queueSnackbar: (snackbar: ISnackbar) => void
}

interface IProps extends ReduxProps {}

interface IState {
    open: boolean
    errored: boolean
    airCheckInEnabled: boolean
    loadingAirStatus: boolean
    loadingCheckIn: boolean
    inputValue: string
}

class CheckInWidget extends React.Component<IProps, IState> {
    state: IState = {
        open: false,
        errored: false,
        airCheckInEnabled: false,
        loadingAirStatus: false,
        loadingCheckIn: false,
        inputValue: ''
    }

    handleClickOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleChange = (event: any) => {
        if (this.state.loadingCheckIn)
            return
        this.setState({
            inputValue: event.target.value,
            errored: false
        })
    }

    toggleAirCheckIn = () => {
        this.setState((state: IState) => {
            if (state.airCheckInEnabled) {
                this.props.disableAir()
                return { airCheckInEnabled: false }
            } else {
                this.props.enableAir()
                return { airCheckInEnabled: true }
            }
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

    componentDidMount() {
        this.props.fetchCheckInStatus()
    }

    render() {
        return (
            <>
                <NavItem
                    title='Check-in'
                    icon='how_to_reg'
                    badgeCount={0}
                    onClick={() => this.handleClickOpen()}
                />
                <Dialog
                    open={this.state.open}
                    onClose={() => this.handleClose()}
                    className='check-in_modal'
                    scroll='paper'
                >
                    <EnhancedDialogTitle title='Student Check-in' onClose={this.handleClose} />
                    <div className='check-in_modal__content'>
                        <div className='check-in_heading'>
                            <Icon>keyboard</Icon>
                            <h4 className='heading_type'>Scan or Enter</h4>
                        </div>
                        <div className='check-in_data'>
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
                        </div>
                    </div>
                </Dialog>
            </>
        )
    }
}

const mapStateToProps = (state: any) => ({
    checkInStatus: state.checkin.status
})

const mapDispatchToProps = {
    fetchCheckInStatus,
    enableAir,
    disableAir,
    checkIn,
    queueSnackbar
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckInWidget)
