import * as React from 'react'
import * as classNames from 'classnames'

import {
    Button,
    Dialog,
    DialogContent,
    Icon
} from '@material-ui/core'

import { BlockDetails } from '../Schedule'
import { EnhancedDialogTitle } from './EnhancedDialogTitle'

interface ScheduleItemDetails {
    id?: number
    variant: string
    title: string
    time?: string
    memo?: string
}

const scheduleItem = (details: ScheduleItemDetails) => {
    const { id, variant, time, title, memo } = details
    return (
        <div className={classNames('log', `--${variant}`)} key={id}>
            <h6 className='log__title'>
                {title}
                {time && <span className='log__time'>{time}</span>}
            </h6>
            {memo && <p className='log__memo'>{memo}</p>}
        </div>
    )
}

interface IProps {
    details: BlockDetails
    open: boolean
    onClose: () => void
}

export const ScheduleBlockDialog = (props: IProps) => {
    const { label, logs, flex, scheduled, appointments, pending, start, end, date } = props.details
    console.log(props.details)
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
                                memo: log.topic,
                                variant: 'success'
                            })
                        ))
                    ) : (
                        <p>No attendance recorded</p>
                    )}
                </section>
                <h5 className='section-header'>Scheduled</h5>
                <section className='section'>
                    {scheduled ? (
                        scheduleItem({
                            title: scheduled.name,
                            variant: pending ? null : (
                                flex === true ? (
                                    logs.some(((log: any) => log.staff.id === scheduled.id)) ? 'success' : 'fail'
                                ) : (
                                    logs.length > 0 ? 'success' : 'fail'
                                )
                            ),
                            memo: scheduled.topic
                        })
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