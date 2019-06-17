import * as React from 'react'

import {
    Button,
    Dialog,
    DialogContent,
    Icon
} from '@material-ui/core'

import { BlockDetails } from '../Schedule'
import { EnhancedDialogTitle } from './EnhancedDialogTitle'

interface ScheduleItemDetails {
    id: number
    icon: string
    title: string
    time?: string
    memo?: string
}

const scheduleItem = (details: ScheduleItemDetails) => {
    const { id, icon, time, title, memo } = details
    return (
        <div className='log' key={id}>
            <div className='log__title'>
                <div className='log__icon'><Icon>{icon}</Icon></div>
                <h6>
                    {title}
                    {time && <span className='log__time'>{time}</span>}
                </h6>
            </div>
            <p className='log__memo'>{memo || 'Example memo'}</p>
        </div>
    )
}

interface IProps {
    details: BlockDetails
    open: boolean
    onClose: () => void
}

export const ScheduleBlockDialog = (props: IProps) => {
    const { label, logs, scheduled, appointments, start, end, date } = props.details

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
                            scheduleItem({
                                id: index,
                                time: log.time,
                                title: log.staff.name,
                                icon: 'check'
                            })
                        ))
                    ) : (
                        <p>No attendance recorded</p>
                    )}
                </section>
                <h5 className='section-header'>Scheduled</h5>
                <section className='section'>
                    {scheduled && scheduled.length > 0 ? (
                        scheduled.map((scheduledItem: any, index: number) => (
                            scheduleItem({
                                id: index,
                                title: scheduledItem.staff.name,
                                icon: logs.some(((log: any) => log.staff.id === scheduledItem.staff.id)) ? 'check' : 'cross'
                            })
                        ))
                    ) : (
                        <p>Nothing scheduled</p>
                    )}
                </section>
                {appointments && appointments.length > 0 && (
                    <div>Appointments</div>
                )}
                
            </DialogContent>
        </Dialog>
    )
}