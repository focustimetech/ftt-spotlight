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
    const handleSubmit = () => {
        props.onClose()
        props.onSubmit()
    }

    return (
        <Dialog open={props.open}>
            <DialogTitle>Unsaved Report</DialogTitle>
            <DialogContent>
                <DialogContentText>Are you sure you want to replace this Report?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant='text' onClick={() => props.onClose()}>Cancel</Button>
                <Button variant='text' color='primary' onClick={() => handleSubmit()}>Okay</Button>
            </DialogActions>
        </Dialog>
    )
}

export { ReportUnsavedModal }
