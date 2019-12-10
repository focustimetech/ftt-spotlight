import axios from 'axios'
import classNames from 'classnames'
import React from 'react'
import { connect } from 'react-redux'

import {
    Avatar,
    Chip,
    CircularProgress,
    Divider,
    FormControlLabel,
    FormHelperText,
    Icon,
    IconButton,
    InputBase,
    Paper,
    Switch,
    Tooltip,
    Typography
} from '@material-ui/core'

import { checkIn } from '../../actions/checkinActions'
import { ISnackbar, queueSnackbar } from '../../actions/snackbarActions'
import { ILedgerEntry } from '../../types/calendar'
import { CheckInChip, ICheckInError, ICheckInRequest, ICheckInResponse } from '../../types/checkin'
import {
    appendToLocalStorageArray,
    AUTO_SUBMIT,
    CHECK_IN_CHIPS,
    CHECK_IN_ERRORS,
    getObjectFromLocalStorage,
    writeObjectToLocalStorage,
} from '../../utils/storage'
import { getCurrentTimestamp, makeArray } from '../../utils/utils'

import { LoadingIconButton } from '../Form/LoadingIconButton'
import { ModalSection } from '../ModalSection'

const AUTO_TIMEOUT = 300000 // 5 minutes

type NameFetchState = 'allow' | 'skip' | 'force-allow'

interface IReduxProps {
    checkInResponse: ICheckInResponse
    checkIn: (request: ICheckInRequest) => Promise<any>
    queueSnackbar: (snackbar: ISnackbar) => void
}

interface IProps extends IReduxProps {
    dateTime?: string
    didCheckIn?: () => Promise<any>
    handleOpenErrorsDialog?: () => void
    didReceivedChips?: () => void
    didSubmit?: () => void
    onExceedTimeouts?: () => void
}

interface IState {
    autoSubmit: boolean
    chips: CheckInChip[]
    duplicateIndex: number
    errored: boolean
    inputValue: string
    nameFetchState: NameFetchState
    timedOutChips: number
    uploading: boolean
}

class CheckInForm extends React.Component<IProps, IState> {
    keyBuffer: number[]
    timer: number
    inputRef: any

    state: IState = {
        autoSubmit: false,
        chips: [],
        duplicateIndex: -1,
        errored: false,
        inputValue: '',
        nameFetchState: 'allow',
        timedOutChips: 0,
        uploading: false,
    }

    handleChange = (event: any) => {
        if (this.state.uploading) {
            return
        }
        this.refreshAutoSubmit()
        this.setState({
            inputValue: event.target.value,
            errored: false,
            duplicateIndex: -1
        })
    }

    onKeyDown = (event: any) => {
        if (this.state.uploading) {
            return
        }
        if (event.keyCode === 8) { // Backspace
            if (this.state.inputValue.length === 0) {
                this.handleRemoveChip(this.state.chips[this.state.chips.length - 1])
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

    onPaste = (event: any) => {
        const clipboard: string = event.clipboardData.getData('Text')
        this.handleCreateChip(clipboard)
        event.preventDefault()
        this.setState({ inputValue: '' })
    }

    handleCreateChip = (value?: string) => {
        if (!value && this.state.inputValue.length === 0) {
            return
        }
        this.refreshAutoSubmit()
        const chipValues: string[] = value ? value.split(/[\s,]+/) : [this.state.inputValue]
        chipValues.forEach((chipValue: string) => {
            const newChip: CheckInChip = {
                type: 'student_number',
                value: chipValue,
                loading: this.state.nameFetchState !== 'skip',
                time: getCurrentTimestamp(),
                date_time: this.props.dateTime
            }
            const index = this.findChip(newChip)
            if (index === -1) {
                this.setState((state: IState) => ({
                    chips: [...state.chips, newChip],
                    duplicateIndex: -1,
                    inputValue: ''
                }), () => {
                    if (!this.state.uploading) {
                        this.fetchStudent(newChip)
                    }
                    writeObjectToLocalStorage(CHECK_IN_CHIPS, this.state.chips)
                })
            } else {
                this.setState({ duplicateIndex: index })
            }
        })
    }

    handleRemoveChip = (chip: CheckInChip) => {
        if (this.state.uploading) {
            return
        }
        const removeIndex: number = this.findChip(chip)
        this.setState((state: IState) => ({
            chips: state.chips.filter((existingChip: CheckInChip, index: number) => index !== removeIndex),
            duplicateIndex: -1
        }), () => {
            writeObjectToLocalStorage(CHECK_IN_CHIPS, this.state.chips)
            this.inputRef.focus()
        })
    }

    findChip = (chip: CheckInChip): number => {
        for (let i = 0; i < this.state.chips.length; i ++) {
            const pivot: CheckInChip = this.state.chips[i]
            if (chip.type === 'id' && pivot.type === 'id') {
                if (chip.value.id === pivot.value.id) {
                    return i
                }
            } else if (chip.type === 'student_number' && this.state.chips[i].type === 'student_number') {
                if (chip.value === pivot.value) {
                    return i
                }
            }
        }
        return -1
    }

    replaceChip = (newChip: CheckInChip, index: number) => {
        const newChips: CheckInChip[]
            = this.state.chips.reduce((acc: CheckInChip[], chip: CheckInChip, idx: number) => {
            if (index === idx) {
                acc.push(newChip)
            } else {
                acc.push(chip)
            }
            return acc
        }, [])
        this.setState({ chips: newChips })
    }

    fetchStudent = (chip: CheckInChip) => {
        if (chip.type !== 'student_number') {
            return
        }

        const index: number = this.findChip(chip)
        let replacementChip: CheckInChip = { ...chip, loading: false }
        if (this.state.nameFetchState !== 'skip') {
            axios.get(`/api/students/student-number/${chip.value}`, { timeout: 2500 })
                .then((res: any) => {
                    replacementChip = {
                        type: 'id',
                        time: chip.time,
                        date_time: chip.date_time,
                        value: res.data,
                        loading: false
                    }
                    this.replaceChip(replacementChip, index)
                })
                .catch((error: any) => {
                    if (error.code === 'ECONNABORTED') {
                        // Connection timed out
                        this.setState((state: IState) => {
                            const skipNameFetch: boolean = state.timedOutChips >= 2 && state.nameFetchState !== 'force-allow'
                            if (skipNameFetch && this.props.onExceedTimeouts) {
                                this.props.onExceedTimeouts()
                            }
                            return {
                                nameFetchState: skipNameFetch ? 'skip' : state.nameFetchState,
                                timedOutChips: state.timedOutChips + 1
                            }
                        })
                    }
                    this.replaceChip(replacementChip, index)
                })
        }
    }

    showResults = () => {
        const success: ILedgerEntry[] = this.props.checkInResponse.success
        const errors: string[] = this.props.checkInResponse.errors
        const checkInError: ICheckInError = {
            timestamp_string: this.props.checkInResponse.timestamp_string,
            errors
        }
        if (errors.length > 0) {
            appendToLocalStorageArray(CHECK_IN_ERRORS, checkInError)
        }
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
        if (this.state.chips.length === 0 && this.state.inputValue.length === 0) {
            return
        }
        this.setState({ uploading: true })
        if (this.props.didSubmit) {
            this.props.didSubmit()
        }
        if (this.state.inputValue.length > 0) {
            this.handleCreateChip()
        }

        const request: ICheckInRequest = {
            chips: this.state.chips,
        }

        this.props.checkIn(request)
            .then(() => {
                if (this.props.didCheckIn) {
                    this.props.didCheckIn().then(() => {
                        this.showResults()
                        this.setState({
                            uploading: false,
                            chips: [],
                        })
                        localStorage.removeItem(CHECK_IN_CHIPS)
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

    toggleAutoSubmit = () => {
        this.setState((state: IState) => {
            if (state.autoSubmit) {
                this.removeAutoSubmit()
                writeObjectToLocalStorage(AUTO_SUBMIT, 0)
                return { autoSubmit: false }
            } else {
                this.refreshAutoSubmit()
                writeObjectToLocalStorage(AUTO_SUBMIT, 1)
                return { autoSubmit: true }
            }
        })
    }

    getAutoSubmitState = () => {
        this.setState({ autoSubmit: true })
    }

    refreshAutoSubmit = () => {
        if (this.timer) {
            clearInterval(this.timer)
        }
        this.timer = window.setInterval(() => this.handleSubmit(), AUTO_TIMEOUT)
    }

    removeAutoSubmit = () => {
        // Clear polling timer
        clearInterval(this.timer)
        this.timer = null
    }

    componentDidMount() {
        const autoSubmit: boolean = Boolean(getObjectFromLocalStorage(AUTO_SUBMIT))
        this.setState({ autoSubmit })
        this.refreshAutoSubmit()
        this.keyBuffer = []
        const localStorageChips = makeArray(getObjectFromLocalStorage(CHECK_IN_CHIPS)) as CheckInChip[]
        if (localStorageChips.length > 0) {
            this.setState({ chips: localStorageChips }, () => {
                this.state.chips.forEach((chip: CheckInChip) => { this.fetchStudent(chip) })
            })
            this.props.didReceivedChips()
        }
    }

    componentWillUnmount() {
        this.removeAutoSubmit()
    }

    render() {
        return (
            <ModalSection
                icon='keyboard'
                title='Scan or Enter'
                labelAdornment={
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.autoSubmit}
                                color='primary'
                                onChange={() => this.toggleAutoSubmit()}
                            />
                        }
                        label={<Typography>Auto-Submit</Typography>}
                    />
                }
            >
                <Paper>
                    <div className='chip-textfield'>
                        {this.state.chips.map((chip: CheckInChip, index: number) => {
                            const isDuplicate: boolean = this.state.duplicateIndex === index
                            let label: string = ''
                            let avatar: any
                            if (chip.type === 'student_number') {
                                label = chip.value
                                avatar = chip.loading ? <Avatar><CircularProgress size={24} /></Avatar> : undefined
                            } else {
                                label = chip.value.name
                                avatar = <Avatar className={classNames(
                                    'chip_avatar', `--${chip.value.color}`
                                )}>{chip.value.initials}</Avatar>
                            }
                            const chipComponent = (
                                <Chip
                                    key={index}
                                    avatar={avatar}
                                    label={label}
                                    onDelete={() => this.handleRemoveChip(chip)}
                                />
                            )
                            return chip.time ? <Tooltip placement='bottom-start' title={chip.time}>{chipComponent}</Tooltip> : chipComponent
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
                                inputRef={(input) => {
                                    this.inputRef = input
                                }}
                            />
                            <Tooltip title='Add (Enter)'>
                                <IconButton disabled={this.state.uploading} onClick={() => this.handleCreateChip()}>
                                    <Icon>keyboard_return</Icon>
                                </IconButton>
                            </Tooltip>
                            <Divider className='chip-textfield__divider' orientation='vertical' />
                            <Tooltip title='Submit (Ctrl + Enter)'>
                                <LoadingIconButton
                                    color='primary'
                                    loading={this.state.uploading}
                                    onClick={() => this.handleSubmit()}
                                    disabled={this.state.chips.length === 0 && this.state.inputValue.length === 0}
                                >
                                    <Icon>cloud_upload</Icon>
                                </LoadingIconButton>
                            </Tooltip>
                        </div>
                    </div>
                </Paper>
                {this.state.autoSubmit && (
                    // tslint:disable-next-line: max-line-length
                    <FormHelperText>Student numbers will be automatically submitted after 5 minutes of inactivity.</FormHelperText>
                )}
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
