import * as React from 'react'

import {
    Button,
    Dialog,
    DialogContent
} from '@material-ui/core'

import { BlockDetails } from '../Schedule'
import { EnhancedDialogTitle } from './EnhancedDialogTitle'

interface IProps {
    details: BlockDetails
    open: boolean
    onClose: () => void
}

export const ScheduleBlockDialog = (props: IProps) => {
    const { label, start, end, date } = props.details
    return (
        <Dialog open={props.open} className='schedule-block-dialog'>
            <EnhancedDialogTitle className='schedule-block-dialog__title' onClose={props.onClose}>
                <h6>{label || 'Unlaballed Block'}<span>{`${start} - ${end}`}</span></h6>
                <h3>{date}</h3>
            </EnhancedDialogTitle>
            <DialogContent>
                <p>Hello world</p>
            </DialogContent>
        </Dialog>
    )
}