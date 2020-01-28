import React from 'react'
import { connect } from 'react-redux'

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography
} from '@material-ui/core'

import { ISnackbar, queueSnackbar } from '../../actions/snackbarActions'
import { ICheckInError } from '../../types/checkin'
import { CHECK_IN_ERRORS, getObjectFromLocalStorage } from '../../utils/storage'
import { makeArray } from '../../utils/utils'

interface IReduxProps {
    queueSnackbar: (snackbar: ISnackbar) => void
}

interface IProps extends IReduxProps {
    open: boolean
    onClose: () => void
}

class ErrorsDialog extends React.Component<IProps> {
    handleClearErrors = () => {
        this.props.onClose()
        const checkInErrors: string = localStorage.getItem(CHECK_IN_ERRORS)
        this.props.queueSnackbar({
            message: 'Cleared check-in errors.',
            buttons: [{ value: 'Undo', callback: () => localStorage.setItem(CHECK_IN_ERRORS, checkInErrors) }]
        })
        localStorage.removeItem(CHECK_IN_ERRORS)
    }

    render() {
        const checkInErrors: ICheckInError[] = makeArray(getObjectFromLocalStorage(CHECK_IN_ERRORS))
        const hasErrors: boolean = checkInErrors && checkInErrors.length > 0
        return (
            <Dialog open={this.props.open}>
                <DialogTitle>Check-in Errors</DialogTitle>
                <DialogContent>
                    {hasErrors ? (
                        <>
                            <DialogContentText>The following check-in entries could not be resolved. This may be because the entry was mistyped, or the entry is not associated with an existing student account.</DialogContentText>
                            {checkInErrors.map((checkInError: ICheckInError) => (
                                <div key={checkInError.timestamp_string}>
                                    <Typography className='check-in_error_header'>{checkInError.timestamp_string}</Typography>
                                    <Typography>
                                        <span className='check-in_error'>{checkInError.errors.join(', ')}</span>
                                    </Typography>
                                </div>
                            ))}
                        </>
                    ) : (
                        <>
                            {/* tslint:disable-next-line: max-line-length */}
                            <DialogContentText>No errors yet. Student numbers you enter but don't resolve will appear here.</DialogContentText>
                        </>
                    )}
                    <DialogActions>
                        {hasErrors && (
                            <Button
                                variant='text'
                                color='primary'
                                onClick={() => this.handleClearErrors()}
                            >Clear All</Button>
                        )}
                        <Button variant='text' onClick={() => this.props.onClose()}>Close</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        )
    }
}

const mapDispatchToProps = { queueSnackbar }
export default connect(null, mapDispatchToProps)(ErrorsDialog)
