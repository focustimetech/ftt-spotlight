import * as React from 'react'
import axios from 'axios'
import classNames from 'classnames'
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
import { ILedgerEntry } from '../../types/calendar'
import { ICheckInRequest, CheckInChip, ICheckInResponse } from '../../types/checkin'
import { ISnackbar, queueSnackbar } from '../../actions/snackbarActions'
import { appendToLocalStorageArray, writeObjectToLocalStorage, getObjectFromLocalStorage, makeArray } from '../../utils/utils'
import { LoadingIconButton } from '../Form/LoadingIconButton'
import { ModalSection } from '../ModalSection'

interface ReduxProps {
    checkInResponse: ICheckInResponse
    checkIn: (request: ICheckInRequest) => Promise<any>
    queueSnackbar: (snackbar: ISnackbar) => void
}

interface IProps extends ReduxProps {
    dateTime?: string
    didCheckIn?: () => Promise<any>
    handleOpenErrorsDialog?: () => void
    didReceivedChips?: () => void
}

interface IState {
    chips: CheckInChip[]
    duplicateIndex: number
    errored: boolean
    uploading: boolean
    inputValue: string
}

class CheckInForm extends React.Component<IProps, IState> {
    state: IState = {
        chips: [],
        duplicateIndex: -1,
        errored: false,
        uploading: false,
        inputValue: ''
    }

    handleChange = (event: any) => {
        if (this.state.uploading)
            return
        this.setState({
            inputValue: event.target.value,
            errored: false,
            duplicateIndex: -1
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
                this.handleCreateChip()
            }
        }
    }

    onPaste = (event: any) => {
        const clipboard: string = event.clipboardData.getData('Text')
        this.handleCreateChip(clipboard)
        event.preventDefault()
        this.setState({ inputValue: '' })
    }

    handleCreateChip = (value?: string) => {
        if (!value && this.state.inputValue.length === 0)
            return
        const chipValues: string[] = value ? value.split(/[\s,]+/) : [this.state.inputValue]
        chipValues.forEach((chipValue: string) => {
            const newChip: CheckInChip = {
                type: 'student_number',
                value: chipValue,
                loading: true
            }
            const index = this.findChip(newChip)
            if (index === -1) {
                this.setState((state: IState) => ({
                    chips: [...state.chips, newChip],
                    duplicateIndex: -1,
                    inputValue: ''
                }), () => {
                    if (!this.state.uploading)
                        this.fetchStudent(newChip)
                    writeObjectToLocalStorage('check-in-chips', this.state.chips)
                })
            } else {
                this.setState({ duplicateIndex: index })
            }
        })
    }

    handleRemoveChip = (chip: CheckInChip) => {
        const removeIndex: number = this.findChip(chip)
        this.setState((state: IState) => ({
            chips: state.chips.filter((existingChip: CheckInChip, index: number) => index !== removeIndex),
            duplicateIndex: -1
        }), () => {
            writeObjectToLocalStorage('check-in-chips', this.state.chips)
        })
    }

    findChip = (chip: CheckInChip): number => {
        for (let i = 0; i < this.state.chips.length; i ++) {
            const pivot: CheckInChip = this.state.chips[i]
            if (chip.type === 'id' && pivot.type === 'id') {
                if (chip.value.id === pivot.value.id)
                    return i
            } else if (chip.type === 'student_number' && this.state.chips[i].type === 'student_number') {
                if (chip.value === pivot.value)
                    return i
            }
        }
        return -1
    }

    replaceChip = (newChip: CheckInChip, index: number) => {
        const newChips: CheckInChip[] = this.state.chips.reduce((acc: CheckInChip[], chip: CheckInChip, idx: number) => {
            if (index === idx)
                acc.push(newChip)
            else
                acc.push(chip)
            return acc
        }, [])
        this.setState({ chips: newChips })
    }

    fetchStudent = (chip: CheckInChip) => {
        if (chip.type !== 'student_number')
            return

        const index: number = this.findChip(chip)
        let replacementChip: CheckInChip = { ...chip, loading: false }
        axios.get(`http://localhost:8000/api/students/student-number/${chip.value}`)
            .then((res: any) => {
                replacementChip = { type: 'id', value: res.data, loading: false }
                this.replaceChip(replacementChip, index)
            }, () => {
                this.replaceChip(replacementChip, index)
            })
    }

    showResults = () => {
        const success: ILedgerEntry[] = this.props.checkInResponse.success
        const errors: string[] = this.props.checkInResponse.errors
        const timestamp_string: string = this.props.checkInResponse.timestamp_string
        if (errors.length > 0)
            appendToLocalStorageArray('check-in-errors', { errors, timestamp_string })
        const message: string = success.length > 0
            ? `Checked in ${success.length} ${success.length === 1 ? 'student' : 'students'}${errors && errors.length > 0
                ? `, but ${errors.length} ${errors.length === 1 ? 'entry' : 'entries'} could not be resolved` : ''
            }.`
            : 'No students could be checked in.'
        this.props.queueSnackbar({
            message,
            buttons: errors && errors.length > 0 && this.props.handleOpenErrorsDialog ? [{
                value: 'Show Errors', callback: () => this.props.handleOpenErrorsDialog()
            }] : undefined,
            links: !this.props.handleOpenErrorsDialog ? [{
                value: 'Show Errors', to: '/check-in/#errors'
            }] : undefined,
            key: 'CHECKED_IN_SUCCESSFULLY'
        })
    }

    handleSubmit = () => {
        this.setState({ uploading: true }, () => {
            if (this.state.inputValue.length > 0)
                this.handleCreateChip()
        })
        let request: ICheckInRequest = {
            student_numbers: [],
            student_ids: [],
            date_time: this.props.dateTime
        }
        this.state.chips.forEach((chip: CheckInChip) => {
            if (chip.type === 'student_number')
                request.student_numbers.push(chip.value)
            else
                request.student_ids.push(chip.value.id)
        })
        this.props.checkIn(request)
            .then(() => {
                if (this.props.didCheckIn) {
                    this.props.didCheckIn().then(() => {
                        this.showResults()
                        this.setState({
                            uploading: false,
                            chips: [],
                        })
                        localStorage.removeItem('check-in-chips')
                    })
                } else {
                    this.showResults()
                    this.setState({
                        uploading: false
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

    componentDidMount() {
        const localStorageChips = makeArray(getObjectFromLocalStorage('check-in-chips')) as CheckInChip[]
        if (localStorageChips.length > 0) {
            console.log('localStorageChips:', localStorageChips)
            this.setState({ chips: localStorageChips }, () => {
                this.state.chips.forEach((chip: CheckInChip) => { this.fetchStudent(chip) })
            })
            this.props.didReceivedChips()
        }
    }

    render() {
        return (
            <ModalSection
                icon='keyboard'
                title='Scan or Enter'
            >
                <Paper>
                    <div className='chip-textfield'>
                        {this.state.chips.map((chip: CheckInChip, index: number) => {
                            const isDuplicate: boolean = this.state.duplicateIndex === index
                            let label: string = ''
                            let avatar: any = undefined
                            if (chip.type === 'student_number') {
                                label = chip.value
                                avatar = chip.loading ? <Avatar><CircularProgress size={24} /></Avatar> : undefined
                            } else {
                                label = chip.value.name
                                avatar = <Avatar className={classNames('chip_avatar', `--${chip.value.color}`)}>{chip.value.initials}</Avatar> 
                            }
                            return (
                                <Chip
                                    key={index}
                                    avatar={avatar}
                                    label={label}
                                    onDelete={() => this.handleRemoveChip(chip)}
                                />
                            )
                        })}
                        <div className='chip-textfield__actions'>
                            <InputBase
                                className='chip-textfield__input'
                                value={this.state.inputValue}
                                onChange={this.handleChange}
                                placeholder='Enter Student Numbers'
                                disabled={this.state.uploading}
                                onKeyDown={this.onKeyDown}
                                onPaste={this.onPaste}
                                autoFocus
                            />
                            <IconButton disabled={this.state.uploading} onClick={() => this.handleCreateChip()}>
                                <Icon>keyboard_return</Icon>
                            </IconButton>
                            <Divider className='chip-textfield__divider' orientation='vertical' />
                            <LoadingIconButton
                                color='primary'
                                loading={this.state.uploading}
                                onClick={() => this.handleSubmit()}
                                disabled={this.state.chips.length === 0}
                            >
                                <Icon>cloud_upload</Icon>
                            </LoadingIconButton>
                        </div>
                    </div>
                </Paper>
            </ModalSection>
        )
    }
}

const mapStateToProps = (state: any) => ({
    checkInResponse: state.checkin.response
})
const mapDispatchToProps = {
    checkIn,
    queueSnackbar
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckInForm)
