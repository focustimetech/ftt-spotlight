import * as React from 'react'

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography
} from '@material-ui/core'

interface IProps {
    open: boolean
    onClose: () => void
}

export const AboutDialog = (props: IProps) => {
    return (
        <Dialog open={props.open}>
            <DialogTitle>About Spotlight</DialogTitle>
            <DialogContent>
                <div className='about-spotlight'>
                    <div className='about-spotlight__logo' />
                    <Typography variant='h6' className='about-spotlight__version'><span>Version </span>1.0.0</Typography>
                </div>
            </DialogContent>
            <DialogActions>
                <Button variant='text' onClick={() => props.onClose()}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}
