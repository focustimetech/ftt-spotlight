import copyToClipboard from 'copy-to-clipboard'
import React from 'react'
import { connect } from 'react-redux'

import {
    Icon,
    IconButton,
    Menu,
    MenuItem
} from '@material-ui/core'

import { checkIn } from '../../actions/checkinActions'
import { ISnackbar, queueSnackbar } from '../../actions/snackbarActions'
import { ILedgerEntry } from '../../types/calendar'
import { ICheckInChip, ICheckInError, ICheckInRequest, ICheckInResponse } from '../../types/checkin'
import {
    appendToLocalStorageArray,
    CHECK_IN_ERRORS,
} from '../../utils/storage'
import { downloadCsv, getCurrentTimestamp, makeArray } from '../../utils/utils'

import ChipSelect, { ISelectChip } from '../ChipSelect'
import { LoadingButton } from '../Form/LoadingButton'
import { ModalSection } from '../ModalSection'
import ConfirmDeleteDialog from './ConfirmDeleteDialog'

interface IReduxProps {
    checkInResponse: ICheckInResponse
    checkIn: (request: ICheckInRequest) => Promise<any>
    queueSnackbar: (snackbar: ISnackbar) => void
}

interface IProps extends IReduxProps {
    disabled: boolean
    dateTime?: string
    didCheckIn?: () => Promise<any>
    handleOpenErrorsDialog?: () => void
    didReceivedChips?: () => void
    didSubmit?: () => void
    onExceedTimeouts?: () => void
    onPreventNavigation: () => void
    onAllowNavigation: () => void
}

interface IState {
    chips: Array<ISelectChip<Date>>
    confirmDeleteDialogOpen: boolean
    errored: boolean
    menuRef: any
    uploading: boolean
}

class CheckInForm extends React.Component<IProps, IState> {
    keyBuffer: number[]

    state: IState = {
        chips: [],
        confirmDeleteDialogOpen: false,
        errored: false,
        menuRef: null,
        uploading: false
    }

    handleCreateChip = (chip: ISelectChip<Date>) => {
        if (!chip) {
            return
        }
        chip.value = new Date()
        chip.title = chip.value.toString()
        this.setState((state: IState) => ({
            chips: [...state.chips, chip]
        }))
        this.props.onPreventNavigation()
    }

    handleRemoveChip = (index: number) => {
        // const removeIndex: number = this.findChip(chip)
        this.setState((state: IState) => {
            state.chips.splice(index, 1)
            return { chips: state.chips }
        }, () => {
            if (this.state.chips.length === 0) {
                this.props.onAllowNavigation()
            }
        })
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
            : 'No students where checked in.'
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
        if (this.state.chips.length === 0) {
            return
        }
        this.setState({ uploading: true })
        if (this.props.didSubmit) {
            this.props.didSubmit()
        }
        const request: ICheckInRequest = {
            chips: this.state.chips.map((chip: ISelectChip<Date>) => ({ value: chip.label, timestamp: chip.value.toISOString() })),
            type: 'student_number',
            date: this.props.dateTime
        }
        this.props.checkIn(request)
            .then(() => {
                this.setState({ uploading: false, chips: [] })
                this.showResults()
                this.props.onAllowNavigation()
            }, () => {
                this.setState({ uploading: false })
            })
    }

    handleMenuClick = (callback: () => void) => {
        this.handleMenuClose()
        callback()
    }

    handleCopyChips = () => {
        const clipboardData: string = this.state.chips
            .map((chip: ISelectChip<Date>) => chip.label.trim())
            .join(', ')
        copyToClipboard(clipboardData)
        this.props.queueSnackbar({ message: 'Copied Student Numbers to clipboard.' })
    }

    handleDownloadChips = () => {
        const rows: string[][] = [
            ['Student Number', 'Timestmap'],
            ...this.state.chips.map((chip: ISelectChip<Date>): string[] => [chip.label, chip.value.toISOString()])
        ]
        const dateString: string = new Date().toISOString()
        const filename: string = `SpotlightStudentNumbers - ${dateString}`
        downloadCsv(rows, filename)
        this.props.queueSnackbar({ message: 'Downloaded Student Numbers.' })
    }

    handleRemoveAllChips = () => {
        this.setState({ chips: [] })
        this.props.queueSnackbar({ message: 'Removed all Student Numbers.' })
    }

    handleMenuOpen = (event: any) => {
        this.setState({ menuRef: event.currentTarget })
    }

    handleMenuClose = () => {
        this.setState({ menuRef: null })
    }

    render() {
        const hasChips: boolean = this.state.chips.length > 0
        const menuOpen: boolean = Boolean(this.state.menuRef)
        const disabled: boolean = this.props.disabled || this.state.uploading

        return (
            <>
                <ModalSection
                    badgeCount={this.state.chips.length}
                    icon='keyboard'
                    title='Scan or Enter'
                >
                    <ChipSelect
                        chips={this.state.chips}
                        onCreateChip={this.handleCreateChip}
                        onRemoveChip={this.handleRemoveChip}
                        disabled={disabled}
                        placeholder='Enter Student Numbers'
                        helperText={undefined}
                    />
                    <div className='check_in_actions'>
                        <div>
                            <LoadingButton
                                variant='contained'
                                color='primary'
                                disabled={!hasChips}
                                loading={this.state.uploading}
                                onClick={() => this.handleSubmit()}
                            >Check In</LoadingButton>
                        </div>
                        <div>
                            <IconButton onClick={this.handleMenuOpen} disabled={this.state.chips.length === 0}><Icon>more_horiz</Icon></IconButton>
                            <Menu
                                open={menuOpen}
                                onClose={this.handleMenuClose}
                                anchorEl={this.state.menuRef}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                getContentAnchorEl={undefined}
                                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            >
                                <MenuItem onClick={() => this.handleMenuClick(() => this.setState({ confirmDeleteDialogOpen: true }))}>Remove All</MenuItem>
                                <MenuItem onClick={() => this.handleMenuClick(this.handleCopyChips)}>Copy to Clipboard</MenuItem>
                                <MenuItem onClick={() => this.handleMenuClick(this.handleDownloadChips)}>Download Student Numbers</MenuItem>
                            </Menu>
                        </div>
                    </div>
                </ModalSection>
                <ConfirmDeleteDialog
                    open={this.state.confirmDeleteDialogOpen}
                    onClose={() => this.setState({ confirmDeleteDialogOpen: false })}
                    onSubmit={() => this.handleRemoveAllChips()}
                />
            </>
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
