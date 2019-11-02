import * as React from 'react'
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
        localStorage.removeItem(CHECK_IN_ERRORS)
        this.props.onClose()
        this.props.queueSnackbar({ message: 'Cleared check-in errors.' })
    }

    render() {
        const errors: any[] = makeArray(getObjectFromLocalStorage(CHECK_IN_ERRORS))
        const hasErrors: boolean = errors && errors.length > 0
        return (
            <Dialog open={this.props.open}>
                <DialogTitle>Check-in Errors</DialogTitle>
                <DialogContent>
                    {hasErrors ? (
                        <>
                            {/* tslint:disable-next-line: max-line-length */}
                            <DialogContentText>The following check-in entries could not be resolved. This may be because the entry was mistyped, or the entry is not associated with an existing student account.</DialogContentText>
                            {errors.map((error: any, index: number) => (
                                <div key={index}>
                                    <Typography className='check-in_error_header'>{error.timestamp_string}</Typography>
                                    <Typography>
                                        {error.errors
                                            .map((errorString: string) => (<span key={errorString} className='check-in_error'>{errorString}</span>))
                                            .reduce((prev: string, curr: string) => [prev, ', ', curr], [])
                                        }
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
