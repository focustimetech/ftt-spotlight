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
    const { label, logs, appointments, start, end, date } = props.details
    return (
        <Dialog open={props.open} className='schedule-block-dialog'>
            <EnhancedDialogTitle className='schedule-block-dialog__title' onClose={props.onClose}>
                <h4 className='label'>{label || 'Unlaballed Block'}<span>{`${start} - ${end}`}</span></h4>
                <h3 className='date'>{date}</h3>
            </EnhancedDialogTitle>
            <DialogContent>
                <h5 className='section-header'>Logs</h5>
                <section className='section'>
                    {logs && logs.length > 0 ? (
                        logs.map((log: any, index: number) => (
                            <div>{`Log ${index}`}</div>
                        ))
                    ) : (
                        'No logs.'
                    )}
                </section>
                <h5 className='section-header'>Scheduled</h5>
                <section className='section'>
                    Scheduled
                </section>
                {appointments && appointments.length > 0 && (
                    <div>Appointments</div>
                )}
                
            </DialogContent>
        </Dialog>
    )
}