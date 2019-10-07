import * as React from 'react'

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Typography
} from '@material-ui/core'

interface IProps {
    open: boolean
    onClose: () => void
}

export const AboutSpotlight = (props: IProps) => {
    return (
        <Dialog open={props.open}>
            <DialogContent>
                <div className='about-spotlight'>
                    <div className='about-spotlight__logo' />
                    <Typography variant='h4' className='about-spotlight__name'>Spotlight</Typography>
                    <Typography variant='subtitle1' className='about-spotlight__version'><span>Version </span>1.2.1</Typography>
                    <Typography variant='subtitle2'>By Focustime Technologies</Typography>
                </div>
            </DialogContent>
            <DialogActions>
                <Button variant='text' onClick={() => props.onClose()}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}
