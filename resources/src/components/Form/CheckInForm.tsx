import * as React from 'react'
import { connect } from 'react-redux'

import {
    Avatar,
    Chip,
    CircularProgress,
    Divider,
    Icon,
    IconButton,
    InputBase,
    Paper
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
    chips: string[]
    containsDuplicate: boolean
    errored: boolean
    uploading: boolean
    inputValue: string
}

class CheckInForm extends React.Component<IProps, IState> {
    state: IState = {
        chips: ['47182', '485734', '5847484', '44734734', '484734', '4740248', '4717', '096438', '184849'],
        containsDuplicate: false,
        errored: false,
        uploading: false,
        inputValue: 'test'
    }

    handleChange = (event: any) => {
        if (this.state.uploading)
            return
        this.setState({
            inputValue: event.target.value,
            errored: false,
            containsDuplicate: false
        })
    }


    onKeyDown = (event: any) => {
        if (this.state.uploading)
            return

        if (event.keyCode === 8) { // Backspace
            if (this.state.inputValue.length === 0)
                this.handleRemoveChip(this.state.chips[this.state.chips.length - 1])

        } else if ([188, 13, 32].includes(event.keyCode)) {
            event.preventDefault()
            if (this.state.inputValue.length > 0) {
                if (this.handleCreateChip(this.state.inputValue)) {
                    this.setState({
                        containsDuplicate: false,
                        inputValue: ''
                    })
                }
            }
        }
    }

    handleCreateChip = (chip: string): boolean => {
        if (this.state.chips.every((existingChip: string) => existingChip !== chip)) {
            this.setState((state: IState) => ({
                chips: [...state.chips, chip],
                containsDuplicate: false
            }))
            return true
        } else {
            this.setState({ containsDuplicate: true })
            return false
        }
    }

    handleRemoveChip = (chip: string) => {
        this.setState((state: IState) => ({
            chips: state.chips.filter((existingChip: string) => existingChip !== chip),
            containsDuplicate: false
        }))
    }

    handleSubmit = (event: any) => {
        event.preventDefault()
        this.setState({ uploading: true })
        const request: ICheckInRequest = {
            student_numbers: this.state.inputValue.split(','),
            date_time: this.props.dateTime
        }
        this.props.checkIn(request)
            .then((res: any) => {
                if (this.props.didCheckIn) {
                    this.props.didCheckIn().then(() => {
                        this.props.queueSnackbar({ message: 'Checked in students successfully.', key: 'CHECKED_IN_SUCCESSFULLY' })
                        this.setState({
                            uploading: false,
                            inputValue: ''
                        })
                    })
                } else {
                    this.props.queueSnackbar({ message: 'Checked in students successfully.', key: 'CHECKED_IN_SUCCESSFULLY' })
                    this.setState({
                        uploading: false,
                        inputValue: ''
                    })
                }
            })
            .catch((error: any) => {
                this.setState({
                    errored: true,
                    uploading: false
                })
            })
    }

    render() {
        return (
            <ModalSection
                icon='keyboard'
                title='Scan or Enter'
            >
                <Paper>
                    <div className='chip-textfield'>
                        {this.state.chips.map((chip: string) => (
                            <Chip label={chip} onDelete={() => this.handleRemoveChip(chip)} />
                        ))}
                        <div className='chip-textfield__actions'>
                            <InputBase
                                className='chip-textfield__input'
                                value={this.state.inputValue}
                                onChange={this.handleChange}
                                placeholder='Enter Student Numbers'
                                //onKeyPress={this.onKeyPress}
                                onKeyDown={this.onKeyDown}
                                //onKeyUp={this.onKeyUp}
                            />
                            <IconButton><Icon>keyboard_return</Icon></IconButton>
                            <Divider className='chip-textfield__divider' orientation='vertical' />
                            <IconButton color='primary'><Icon>cloud_upload</Icon></IconButton>
                        </div>
                    </div>
                </Paper>
            </ModalSection>
        )
    }
}

const mapDispatchToProps = {
    checkIn,
    queueSnackbar
}

export default connect(null, mapDispatchToProps)(CheckInForm)
