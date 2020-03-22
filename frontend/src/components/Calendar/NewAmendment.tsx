import React from 'react'
import { connect } from 'react-redux'

import { Button, TextField } from '@material-ui/core'

import { createAmendment, IAmendmentRequest } from '../../actions/studentScheduleActions'
import { LoadingButton } from '../Form/LoadingButton'

import { ISnackbar, queueSnackbar } from '../../actions/snackbarActions'
import { IBlockDetails } from '../../types/calendar'

interface IReduxProps {
    createAmendment: (amendment: IAmendmentRequest) => Promise<any>
    queueSnackbar: (snackbar: ISnackbar) => void
}

interface IProps extends IReduxProps {
    studentID: number
    blockDetails: IBlockDetails
    onSubmit: () => Promise<any>
}

interface IState {
    error: string
    open: boolean
    uploading: boolean
    value: string
}

class NewAmendment extends React.Component<IProps, IState> {
    state: IState = {
        error: null,
        open: false,
        uploading: false,
        value: ''
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({
            open: false,
            value: ''
        })
    }

    handleChange = (event: any) => {
        if (this.state.uploading) {
            return
        }
        this.setState({
            value: event.target.value,
            error: null
        })
    }

    handleSubmit = () => {
        if (this.state.value.length === 0) {
            this.setState({ error: 'This field cannot be empty.' })
            return
        }
        this.setState({ uploading: true })
        const amendment: IAmendmentRequest = {
            student_id: this.props.studentID,
            block_id: this.props.blockDetails.block_id,
            date: this.props.blockDetails.date,
            memo: this.state.value
        }
        this.props.createAmendment(amendment)
            .then(() => {
                this.props.onSubmit().then(() => {
                    this.setState({ uploading: false })
                    this.props.queueSnackbar({ message: 'Amended schedule.' })
                    this.handleClose()
                })
            })
            .catch(() => {
                this.setState({
                    error: "That didn't work. Please try again.",
                    uploading: false
                })
            })
    }

    render() {
        const isErrored = Boolean(this.state.error)
        return this.state.open ? (
            <div className='calendar_widget'>
                <TextField
                    value={this.state.value}
                    onChange={this.handleChange}
                    variant='filled'
                    placeholder='Memo'
                    label='Amendment'
                    error={isErrored}
                    helperText={isErrored ? this.state.error : undefined}
                    margin='normal'
                    fullWidth
                />
                <div className='calendar_widget__actions'>
                    <LoadingButton
                        loading={this.state.uploading}
                        onClick={() => this.handleSubmit()}
                        variant='text'
                        color='primary'
                    >Submit</LoadingButton>
                    <Button variant='text' onClick={() => this.handleClose()}>Cancel</Button>
                </div>
            </div>
        ) : (
            <div className='calendar_item__container'>
                <Button variant='text' color='primary' onClick={() => this.handleOpen()}>Amend</Button>
            </div>
        )
    }
}

const mapDispatchToProps = { createAmendment, queueSnackbar }

export default connect(null, mapDispatchToProps)(NewAmendment)
