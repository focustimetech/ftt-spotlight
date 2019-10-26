import * as React from 'react'

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core'

interface IProps {
    open: boolean
    onClose: () => void
    onSubmit: () => void
}

const ReportUnsavedModal = (props: IProps) => {
    return (
        <Dialog open={props.open}>
            <DialogTitle>Unsaved Report</DialogTitle>
            <DialogContent>
                <DialogContentText>Are you sure you want to replace this Report?</DialogContentText>
                <DialogActions>
                    <Button variant='text' color='primary' onClick={() => props.onSubmit()}>Okay</Button>
                    <Button variant='text' onClick={() => props.onClose()}>Cancel</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}

export { ReportUnsavedModal }
