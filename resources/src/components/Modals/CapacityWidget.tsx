import * as React from 'react'
import { connect } from 'react-redux'

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Icon,
    IconButton,
    TextField,
    Tooltip
} from '@material-ui/core'

import { setCapacity } from '../../actions/staffActions'
import { ISnackbar, queueSnackbar } from '../../actions/snackbarActions'
import { LoadingButton } from '../Form/LoadingButton'

interface ReduxProps {
    setCapacity: (capacity: number) => Promise<any>
    queueSnackbar: (snackabr: ISnackbar) => void
}

interface IProps extends ReduxProps {
    capacity: number
}

interface IState {
    capacity: number
    loading: boolean
    open: boolean
}

class CapacityWidget extends React.Component<IProps, IState> {
    state: IState = {
        capacity: this.props.capacity,
        loading: false,
        open: false
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleChange = (event: any) => {
        this.setState({ capacity: event.target.value })
    }

    handleSubmit = () => {
        this.setState({ loading: true })
        this.props.setCapacity(this.state.capacity)
            .then(() => {
                this.setState({ loading: false })
                this.props.queueSnackbar({
                    message: 'Updated capacity.'
                })
            })
    }

    render() {
        return (
            <>
                <Tooltip title='Set Capacity'>
                    <IconButton onClick={() => this.handleOpen()}>
                        <Icon>open_with</Icon>
                    </IconButton>
                </Tooltip>
                <Dialog open={this.state.open}>
                    <DialogTitle>Set Capacity</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Set the capacity for your classroom.</DialogContentText>
                        <TextField
                            type='number'
                            variant='filled'
                            label='Capacity'
                            value={this.state.capacity}
                            onChange={this.handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant='text' onClick={() => this.handleClose()}>Close</Button>
                        <LoadingButton
                            variant='text'
                            color='primary'
                            loading={this.state.loading}
                            onClick={() => this.handleSubmit()}
                        >Update</LoadingButton>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
}

const mapDispatchToProps = { queueSnackbar, setCapacity }
export default connect(null, mapDispatchToProps)(CapacityWidget)
