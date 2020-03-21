import React from 'react'

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

const ConfirmDeleteDialog = (props: IProps) => {
    const handleSubmit = () => {
        props.onSubmit()
        props.onClose()
    }

    return (
        <Dialog open={props.open}>
            <DialogTitle>Remove All</DialogTitle>
            <DialogContent>
                <DialogContentText>Are you sure you'd like to remove all entered student numbers?</DialogContentText>
                <DialogActions>
                    <Button onClick={() => props.onClose()}>Cancel</Button>
                    <Button color='primary' onClick={() => handleSubmit()}>Delete</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}

export default ConfirmDeleteDialog
