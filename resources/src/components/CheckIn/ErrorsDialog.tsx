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
import { getObjectFromLocalStorage, writeObjectToLocalStorage, makeArray } from '../../utils/utils'
import { EmptyStateIcon } from '../EmptyStateIcon'

interface ReduxProps {
    queueSnackbar: (snackbar: ISnackbar) => void
}

interface IProps extends ReduxProps {
    open: boolean
    onClose: () => void
}

class ErrorsDialog extends React.Component<IProps> {
    handleClearErrors = () => {

    }

    render() {
        const errors: any[] = makeArray(getObjectFromLocalStorage('check-in-errors'))
        const hasErrors: boolean = errors && errors.length > 0
        return (
            <Dialog open={this.props.open}>
                <DialogTitle>Check-in Errors</DialogTitle>
                <DialogContent>
                    {hasErrors ? (
                        <>
                            <DialogContentText>The following check-in entries could not be resolved. This may be because the entry was mistyped, or the entry is not associated with an existing student account.</DialogContentText>
                            {errors.map((errror: any) => (
                                <Typography>Here are some errors.</Typography>
                            ))}
                        </>
                    ) : (
                        /**
                         * @TODO Change the starred variant into a green checkmark or something similar.
                         */
                        <EmptyStateIcon variant='starred'>
                            <h2>No errors yet</h2>
                            <h3>Student numbers you enter but don't resolve will appear here.</h3>
                        </EmptyStateIcon>
                    )}
                    <DialogActions>
                        <Button variant='text' color='primary' onClick={() => this.handleClearErrors()}>Clear All</Button>
                        <Button variant='text' onClick={() => this.props.onClose()}>Close</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        )
    }
}

const mapDispatchToProps = { queueSnackbar }
export default connect(null, mapDispatchToProps)(ErrorsDialog)
