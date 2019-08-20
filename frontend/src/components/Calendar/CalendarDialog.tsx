import * as React from 'react'

import {
    Button,
    Dialog,
    DialogContent,
    DialogActions,
} from '@material-ui/core'

import {
    IAppointment,
    IBlockDetails,
    ICalendarItemAction,
    ILedgerEntry,
    IScheduled,
} from '../../types/calendar'
import { IStaff } from '../../types/staff'
import { CalendarDialogItem } from './CalendarDialogItem'
import { EnhancedDialogTitle } from '../Modals/EnhancedDialogTitle'

interface IProps {
    details: IBlockDetails
    open: boolean
    onClose: () => void
}

export const CalendarDialog = (props: IProps) => {
    const [isEditing, setEditing] = React.useState(false)

    const handleEditingToggle = () => {
        setEditing(isEditing === false)
    }

    const handleClose = () => {
        setEditing(false)
        props.onClose()
    }

    const { data, date, end, flex, label, pending, start } = props.details
    const appointmentActions: ICalendarItemAction[] = pending ? (
        [{ value: 'Cancel Appointment', callback: () => null }]
    ) : []

    return (
        <Dialog open={props.open} className='calendar-block-dialog'>
            <EnhancedDialogTitle className='calendar-block-dialog__title' onClose={handleClose}>
                <h4 className='label'>{label || 'Unlaballed Block'}<span>{`${start} - ${end}`}</span></h4>
                <h3 className='date'>{date}</h3>
            </EnhancedDialogTitle>
            <DialogContent>
                {data.ledgerEntries && (
                    <>
                        <h5 className='section-header'>Logs</h5>
                        <section className='section'>
                            {data.ledgerEntries.length > 0 ? (
                                data.ledgerEntries.map((log: ILedgerEntry) => (
                                    <CalendarDialogItem
                                        details={{
                                            id: log.id,
                                            time: log.time,
                                            title: log.staff.name,
                                            memo: log.topic.topic,
                                            variant: 'success',
                                            method: log.method
                                        }}
                                        key={log.id}
                                        isEditing={isEditing}
                                    />
                                ))
                            ) : (
                                <p className='empty_text'>No attendance recorded</p>
                            )}
                        </section>
                    </>
                )}
                {data.scheduled && (
                    <>
                        <h5 className='section-header'>Scheduled</h5>
                        <section className='section'>
                            {data.scheduled.length > 0 ? (
                                data.scheduled.map((scheduledItem: IScheduled) => (
                                    <CalendarDialogItem
                                        details={{
                                            title: scheduledItem.name,
                                            variant: pending ? null : (
                                                flex === true ? (
                                                    data.ledgerEntries && data.ledgerEntries.some(((log: any) => (
                                                        log.staff.id === scheduledItem.id))
                                                    ) ? 'success' : 'fail'
                                                ) : (
                                                    data.ledgerEntries.length > 0 ? 'success' : 'fail'
                                                )
                                            ),
                                            memo: scheduledItem.topic ? scheduledItem.topic.topic : undefined
                                        }}
                                        isEditing={isEditing}
                                    />
                                ))
                            ) : (
                                <p className='empty_text'>Nothing scheduled</p>
                            )}
                        </section>
                    </>
                )}
                {data.appointments && (
                    <>
                        <h5 className='section-header'>Appointments</h5>
                        <section className='section'>
                            {data.appointments.length > 0 ? (
                                data.appointments.map((appointment: IAppointment) => (
                                    <CalendarDialogItem
                                        details={{
                                            id: appointment.id,
                                            title: appointment.staff.name,
                                            memo: appointment.memo,
                                            variant: pending ? 'pending' : (
                                                data.ledgerEntries && data.ledgerEntries.some(((log: any) => (
                                                    log.staff.id === appointment.staff.id
                                                ))) ? 'success' : 'fail'
                                            )
                                        }}
                                        key={appointment.id}
                                        isEditing={isEditing}
                                        actions={appointmentActions}
                                    />
                                ))
                            ) : (
                                <p className='empty_text'>No appointments booked</p>
                            )}
                        </section>
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleEditingToggle()} color='primary'>{isEditing ? 'Done' : 'Edit'}</Button>
                <Button onClick={() => handleClose()}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}
